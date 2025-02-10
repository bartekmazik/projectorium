import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectDto } from './dto';
import { JoinProjectDto } from './dto/joinproject.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  async createProject(dto: ProjectDto) {
    await this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        projectCode: String(Math.random()).slice(2, 8),
      },
    });
    return 'Project created';
  }
  async joinProject(dto: JoinProjectDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new Error('Login before joining project');
    }
    const project = await this.prisma.project.findUnique({
      where: {
        projectCode: dto.code,
      },
    });
    if (!project) {
      throw new Error('Project with this code does not exist');
    }
    await this.prisma.projectUser.create({
      data: {
        userId: user.id,
        projectId: project.id,
      },
    });
  }
}
