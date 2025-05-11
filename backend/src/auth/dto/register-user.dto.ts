import { IsUnique } from "@/common/validators/is-unique.validator";
import { IsString, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsUnique('user', 'name')
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72) // 72 characters is the max length for bcrypt
  password: string;
}