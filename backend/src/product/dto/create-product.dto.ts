import { Exists } from "@/common/validators/exits.validator";
import { IsUnique } from "@/common/validators/is-unique.validator";
import { Transform } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @IsUnique("product", "name")
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  price: number;

  @IsInt()
  @Exists("category", "id")
  @Transform(({ value }) => Number(value))
  categoryId: number;
}