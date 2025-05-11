import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ComponentsController } from './components.controller';
import { ComponentsService } from './components.service';

import { OpenAIModule } from 'src/openai/openai.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [OpenAIModule],
  controllers: [ProjectController, ComponentsController],
  providers: [ProjectService, ComponentsService, UserService],
})
export class ProjectModule {}
