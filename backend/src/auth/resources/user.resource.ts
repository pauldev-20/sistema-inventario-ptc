import Resource from "@/common/utils/resource";
import { User } from "@prisma/client";

export class UserResource extends Resource<User> {
    toArray() {
        return {
            id: this.resource.id,
            name: this.resource.name,
        }
    }
}