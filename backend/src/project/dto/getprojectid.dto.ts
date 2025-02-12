import { IsNotEmpty } from 'class-validator';

export class GetProjectIdDto {
  @IsNotEmpty()
  id: number;
}
