import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OpenAIService } from './openai.service';

import { OpenAIRequestDto } from './dto/OpenAIRequestDto';
import { JwtGuard } from 'src/auth/guard';
import { ChatCompletionMessage } from 'openai/resources/chat/completions';

@UseGuards(JwtGuard)
@Controller('open-ai')
export class OpenAIController {
  constructor(private readonly service: OpenAIService) {}

  @Post('generate')
  async generateResponse(
    @Body() request: OpenAIRequestDto,
  ): Promise<ChatCompletionMessage> {
    return this.service.chatCompletion(request);
  }
}
