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
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}
  @Post('create')
  createProject(@GetUser() user: User, @Body() dto: ProjectDto) {
    return this.projectService.createProject(dto, user.id);
  }
  @Post('join')
  joinProject(@GetUser() user: User, @Body() dto: JoinProjectDto) {
    return this.projectService.joinProject(dto, user.id);
  }

  @Get('projects')
  getProjectBasics(@GetUser() user: User) {
    return this.projectService.getProjectBasics(user.id);
  }
  @Get(':id')
  getProject(
    @GetUser() user: User,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.projectService.findProjectById(id, user.id);
  }
}
