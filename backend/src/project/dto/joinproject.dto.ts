import { IsNotEmpty } from 'class-validator';

export class JoinProjectDto {
  @IsNotEmpty()
  code: string;
}
