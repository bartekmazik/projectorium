import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ComponentsService } from './components.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('project')
export class ComponentsController {
  constructor(private ComponentsService: ComponentsService) {}
  @Get('/:id/ranking')
  getTask(@GetUser() user: User, @Param('id', new ParseIntPipe()) id: number) {
    return this.ComponentsService.getRanking(id, user.id);
  }
}
