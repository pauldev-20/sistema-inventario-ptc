import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategories() {
    return await this.categoryRepository.getCategories();
  }

  async getCategory({ id }: { id: number }) {
    const category = await this.categoryRepository.getCategory({ id });
    if (!category) {
      throw new NotFoundException(`Categoria no encontrada`);
    }
    return category;
  }

  async createCategory(data: CreateCategoryDto) {
    return await this.categoryRepository.createCategory({ data });
  }

  async updateCategory({ id, data }: { id: number; data: UpdateCategoryDto }) {
    const exitsCategory = await this.categoryRepository.getCategory({ id });
    if (!exitsCategory) {
      throw new NotFoundException(`Categoria no encontrada`);
    }
    return await this.categoryRepository.updateCategory({ id, data });
  }

  async deleteCategory({ id }: { id: number }) {
    const exitsCategory = await this.categoryRepository.getCategory({ id });
    if (!exitsCategory) {
      throw new NotFoundException(`Categoria no encontrada`);
    }
    const category = await this.categoryRepository.deleteCategory({ id });
    return {
      id: category.id,
    };
  }
}
