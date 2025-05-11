import { BadRequestException, Body, Controller, Delete, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { SuccessResponse } from '@/common/utils/success-response';
import { ProductResource } from './resource/product.resource';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) {}

    @UseGuards(JwtGuard)
    @Get()
    async getProducts(@Query() paginationQueryDto: PaginationQueryDto) {
        const {data, meta} = await this.productService.getProducts(paginationQueryDto);
        return new SuccessResponse(ProductResource.collection(data), 200, undefined, true, meta);
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    async getProduct(@Param('id') id: number) {
        const product = await this.productService.getProduct({ id });
        return new SuccessResponse(ProductResource.make(product), 200);
    }

    @UseGuards(JwtGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async createProduct(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
                    new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/i }),
                ],
                fileIsRequired: false,
                exceptionFactory: (errors) => {
                    return new BadRequestException({
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: 'Error al subir la imagen',
                        error: 'Bad Request',
                        errors: {
                            image: errors
                        }
                    })
                }
            })
        )
        image: Multer.File,
        @Body() createProductDto: CreateProductDto
    ){
        const product = await this.productService.createProduct(createProductDto, image);
        return new SuccessResponse(ProductResource.make(product), 201, 'Producto creado correctamente');
    }

    @UseGuards(JwtGuard)
    @Post(':id')
    @UseInterceptors(FileInterceptor('image'))
    async updateProduct(
        @Param('id') id: number, 
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
                    new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/i }),
                ],
                fileIsRequired: false,
                exceptionFactory: (errors) => {
                    return new BadRequestException({
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: 'Error al subir la imagen',
                        error: 'Bad Request',
                        errors: {
                            image: errors
                        }
                    })
                }
            })
        )
        image: Multer.File,
        @Body() updateProductDto: UpdateProductDto
    ) {
        const product = await this.productService.updateProduct({ id, data: updateProductDto, image });
        return new SuccessResponse(ProductResource.make(product), 200, 'Producto actualizado correctamente');
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async deleteProduct(@Param('id') id: number) {
        const product = await this.productService.deleteProduct({ id });
        return new SuccessResponse({ id: product.id }, 200, 'Producto eliminado correctamente');
    }
}
