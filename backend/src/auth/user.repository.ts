import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private client: PrismaService) {}

  async getUser({ name }: { name: string }): Promise<User | null> {
    return await this.client.user.findUnique({
      where: { name },
    });
  }
  
  async createUser({data}: { data: Prisma.UserCreateInput }): Promise<User> {
    return await this.client.user.create({ data });
  }
}
