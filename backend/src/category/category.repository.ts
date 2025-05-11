import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';

@Injectable()
export class CategoryRepository {
  constructor(private client: PrismaService) {}

  async getCategories(): Promise<Category[]> {
    return await this.client.category.findMany();
  }

  async getCategory({ id }: { id: number }): Promise<Category | null> {
    return await this.client.category.findUnique({
      where: { id },
    });
  }

  async createCategory({
    data,
  }: {
    data: Prisma.CategoryCreateInput;
  }): Promise<Category> {
    return await this.client.category.create({ data });
  }

  async updateCategory({
    id,
    data,
  }: {
    id: number;
    data: Prisma.CategoryUpdateInput;
  }): Promise<Category> {
    return await this.client.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory({ id }: { id: number }): Promise<Category> {
    return await this.client.category.delete({
      where: { id },
    });
  }
}
