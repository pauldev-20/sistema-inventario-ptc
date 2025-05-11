import Resource from "@/common/utils/resource";
import { Category, Product } from "@prisma/client";

interface ProductCategory extends Product {
    category: Category
}
export class ProductResource extends Resource<ProductCategory> {
    toArray() {
        return {
            id: this.resource.id,
            name: this.resource.name,
            description: this.resource.description,
            price: this.resource.price / 100,
            imageUrl: this.resource.imageUrl ?? '',
            createdAt: this.resource.createdAt,
            updatedAt: this.resource.updatedAt,
            category: {
                id: this.resource.category.id,
                name: this.resource.category.name,
            }
        }
    }
}