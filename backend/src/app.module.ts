import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CommonModule } from './common/common.module';
import { StorageModule } from './storage/storage.module';
@Module({
  imports: [PrismaModule, AuthModule, CategoryModule, ProductModule, CommonModule, StorageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
