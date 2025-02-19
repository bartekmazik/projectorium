import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ComponentsController } from './components.controller';
import { ComponentsService } from './components.service';

@Module({
  imports: [],
  controllers: [ProjectController, ComponentsController],
  providers: [ProjectService, ComponentsService],
})
export class ProjectModule {}
