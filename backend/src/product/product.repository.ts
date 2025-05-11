import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma, Product } from "@prisma/client";


@Injectable()
export class ProductRepository {
  constructor(private client: PrismaService) {}

  async getProducts({
    page = 1,
    perPage = 10,
    orderBy = {
      "createdAt": "desc",
    }
  }: {
    page?: number;
    perPage?: number;
    orderBy?: {
      [key: string]: Prisma.SortOrder;
    }
  }): Promise<[number, Product[]]> {
    const total = await this.client.product.count();

    const products = await this.client.product.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy,
      include: {
        category: true,
      },
    });

    return [total, products];
  }

  async getProduct({ id }: { id: number }): Promise<Product | null> {
    return await this.client.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }
  
  async createProduct({data}: { data: Prisma.ProductCreateInput }): Promise<Product> {
    return await this.client.product.create({ data, include: { category: true } });
  }

  async updateProduct({ id, data }: { id: number; data: Prisma.ProductUpdateInput }): Promise<Product> {
    return await this.client.product.update({
      where: { id },
      data,
      include: { category: true }
    });
  }

  async deleteProduct({ id }: { id: number }): Promise<Product> {
    return await this.client.product.delete({
        where: { id },
    });
  }
}
