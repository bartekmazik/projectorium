import { Body, Controller, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './dto';
import { JoinProjectDto } from './dto/joinproject.dto';
import { GetProjectDto } from './dto/getproject.dto';
import { GetProjectIdDto } from './dto/getprojectid.dto';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}
  @Post('create')
  createProject(@Body() dto: ProjectDto) {
    return this.projectService.createProject(dto);
  }
  @Post('join')
  joinProject(@Body() dto: JoinProjectDto) {
    return this.projectService.joinProject(dto);
  }
  @Post('projects')
  getProjectBasics(@Body() dto: GetProjectDto) {
    return this.projectService.getProjectBasics(dto);
  }
  @Post('getproject')
  getProject(@Body() dto: GetProjectIdDto) {
    return this.projectService.findById(dto);
  }
}
