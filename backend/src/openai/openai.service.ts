import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessage } from 'openai/resources/chat/completions';
import { OpenAIRequestDto } from './dto/OpenAIRequestDto';

@Injectable()
export class OpenAIService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  constructor() {}

  async chatCompletion(
    request: OpenAIRequestDto,
  ): Promise<ChatCompletionMessage> {
    const completion = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: request.prompt,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    return completion.choices[0].message;
  }
}
