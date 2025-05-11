import { Module } from '@nestjs/common';
import { IsUniqueValidator } from './validators/is-unique.validator';
import { ExistsValidator } from './validators/exits.validator';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [IsUniqueValidator, ExistsValidator],
  exports: [IsUniqueValidator, ExistsValidator],
})
export class CommonModule {}
