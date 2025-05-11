import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ComponentsController } from './components.controller';
import { ComponentsService } from './components.service';

import { OpenAIModule } from 'src/openai/openai.module';
import { UserService } from 'src/user/user.service';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [OpenAIModule],
  controllers: [ProjectController, ComponentsController],
  providers: [
    ProjectService,
    ComponentsService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ProjectModule {}
