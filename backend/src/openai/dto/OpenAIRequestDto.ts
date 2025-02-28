import { IsNotEmpty } from 'class-validator';

export class OpenAIRequestDto {
  @IsNotEmpty()
  prompt: string;
}
