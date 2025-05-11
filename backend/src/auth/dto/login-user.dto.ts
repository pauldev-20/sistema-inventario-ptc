import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72) // 72 characters is the max length for bcrypt
  password: string;
}
