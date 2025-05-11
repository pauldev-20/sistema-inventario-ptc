import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { PrismaModule } from '@/prisma/prisma.module';
import { StorageModule } from '@/storage/storage.module';

@Module({
  imports: [PrismaModule, StorageModule],
  controllers: [ProductController],
  providers: [ProductRepository, ProductService],
})
export class ProductModule {}
