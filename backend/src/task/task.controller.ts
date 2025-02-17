import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';

import { TaskDto } from './dto';
import { TaskService } from './task.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Post('create')
  createTask(@Body() dto: TaskDto) {
    return this.taskService.createTask(dto);
  }
  @Get('get/:id')
  getTask(@GetUser() user: User, @Param('id', new ParseIntPipe()) id: number) {
    return this.taskService.getTasks(id, user.id);
  }
}
