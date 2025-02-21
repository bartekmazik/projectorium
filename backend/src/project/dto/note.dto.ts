import { IsNotEmpty } from 'class-validator';

export class addNoteDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
