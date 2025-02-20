import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsNotEmpty()
  password: string;
}
