import { IsString, MaxLength, MinLength } from 'class-validator';
import { IsUnique } from 'src/common/validators/is-unique.validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsUnique('category', 'name')
  name: string;
}
