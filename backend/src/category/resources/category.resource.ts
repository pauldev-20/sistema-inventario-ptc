import Resource from '@/common/utils/resource';
import { Category } from '@prisma/client';

export class CategoryResource extends Resource<Category> {
  toArray() {
    return {
      id: this.resource.id,
      name: this.resource.name,
      createdAt: this.resource.createdAt,
      updatedAt: this.resource.updatedAt,
    };
  }
}
