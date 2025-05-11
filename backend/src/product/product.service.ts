import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { Multer } from 'multer';
import { StorageService } from '@/storage/storage.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly storageService: StorageService,
  ) {}

  async getProducts(data: PaginationQueryDto) {
    const {
      page = 1,
      perPage = 10,
      orderBy = 'createdAt',
      sortOrder = 'asc',
    } = data;

    const [total, products] = await this.productRepository.getProducts({
      page,
      perPage,
      orderBy: {
        [orderBy]: sortOrder,
      },
    });

    const lastPage = Math.ceil(total / perPage);
    const nextPage = page < lastPage ? page + 1 : null;

    return {
      data: products,
      meta: {
        currentPage: page,
        nextPage,
        lastPage,
        perPage,
        total,
      },
    };
  }

  async getProduct({ id }: { id: number }) {
    const product = await this.productRepository.getProduct({ id });
    if (!product) {
      throw new NotFoundException(`Producto no encontrado`);
    }
    return product;
  }

  async createProduct(data: CreateProductDto, image?: Multer.File) {
    const newProduct: CreateProductDto & { imageUrl: string | null } = {
      ...data,
      price: data.price * 100,
      imageUrl: null,
    };
    const slug = data.name.toLocaleLowerCase().replace(/ /g, '-');

    if (image) {
      const imageUrl = await this.storageService.uploadFile(
        image,
        'products',
        slug,
      );
      newProduct.imageUrl = imageUrl;
    }

    return await this.productRepository.createProduct({ data: newProduct });
  }

  async updateProduct({
    id,
    data,
    image,
  }: {
    id: number;
    data: UpdateProductDto;
    image?: Multer.File;
  }) {
    const updateData: UpdateProductDto & { imageUrl: string | null } = {
      ...data,
      price: data.price ? data.price * 100 : undefined,
      imageUrl: null,
    };

    const exitsProduct = await this.productRepository.getProduct({ id });

    if (!exitsProduct) {
      throw new NotFoundException(`Producto no encontrado`);
    }

    if (image) {
      const slug = data.name
        ? data.name.toLocaleLowerCase().replace(/ /g, '-')
        : exitsProduct.name.toLocaleLowerCase().replace(/ /g, '-');
      const imageUrl = await this.storageService.uploadFile(
        image,
        'products',
        slug,
      );
      updateData.imageUrl = imageUrl;
    }

    return await this.productRepository.updateProduct({
      id,
      data: data.price ? { ...data, price: data.price * 100 } : data,
    });
  }

  async deleteProduct({ id }: { id: number }) {
    const exitsProduct = await this.productRepository.getProduct({ id });

    if (!exitsProduct) {
      throw new NotFoundException(`Producto no encontrado`);
    }

    const product = await this.productRepository.deleteProduct({ id });

    if (exitsProduct.imageUrl) {
      await this.storageService.deleteFile(exitsProduct.imageUrl);
    }

    return {
      id: product.id,
    };
  }
}
