import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService, UserService],
})
export class TaskModule {}
