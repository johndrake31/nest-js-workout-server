import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class AuthUserDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
