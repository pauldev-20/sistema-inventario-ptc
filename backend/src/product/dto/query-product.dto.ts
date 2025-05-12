import { PaginationQueryDto } from "@/common/dto/pagination-query.dto";
import { Transform } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class QueryProductDto extends PaginationQueryDto {
    @IsOptional()
    @IsInt()
    @Transform(({ value }) => (value ? Number(value) : -1))
    categoryId?: number = -1;
}