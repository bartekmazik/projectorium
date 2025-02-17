import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './dto';
import { JoinProjectDto } from './dto/joinproject.dto';
import { GetProjectDto } from './dto/getproject.dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
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
  @Get(':id')
  getProject(@Param('id', new ParseIntPipe()) id: number) {
    return this.projectService.findById({ id });
  }
}
