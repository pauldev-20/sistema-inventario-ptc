import {  IsString } from 'class-validator';
import { IsUnique } from 'src/common/validators/is-unique.validator';

export class CreateCategoryDto {
  @IsString()
  @IsUnique('category', 'name')
  name: string;
}
