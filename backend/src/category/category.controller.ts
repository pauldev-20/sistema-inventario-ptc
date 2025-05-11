import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { SuccessResponse } from '@/common/utils/success-response';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryResource } from './resources/category.resource';
import { JwtGuard } from '@/auth/guards/jwt.guard';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getCategories() {
    const categories = await this.categoryService.getCategories();
    return new SuccessResponse(CategoryResource.collection(categories), 200);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getCategory(@Param('id') id: number) {
    const category = await this.categoryService.getCategory({ id });
    return new SuccessResponse(CategoryResource.make(category), 200);
  }

  @UseGuards(JwtGuard)
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const category =
      await this.categoryService.createCategory(createCategoryDto);
    return new SuccessResponse(
      CategoryResource.make(category),
      201,
      'Categoría creada correctamente',
    );
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoryService.updateCategory({
      id,
      data: updateCategoryDto,
    });
    return new SuccessResponse(
      CategoryResource.make(category),
      200,
      'Categoría actualizada correctamente',
    );
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    const category = await this.categoryService.deleteCategory({ id });
    return new SuccessResponse(
      category,
      200,
      'Categoría eliminada correctamente',
    );
  }
}
