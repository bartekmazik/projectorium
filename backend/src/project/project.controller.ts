import { Body, Controller, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './dto';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}
  @Post('create')
  createProject(@Body() dto: ProjectDto) {
    return this.projectService.createProject(dto);
  }

  //   @Post('access')
}
