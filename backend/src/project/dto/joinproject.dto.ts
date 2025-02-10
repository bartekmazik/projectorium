import { IsEmail, IsNotEmpty } from 'class-validator';

export class JoinProjectDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
