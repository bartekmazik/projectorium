import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectDto } from './dto';
import { JoinProjectDto } from './dto/joinproject.dto';
import { GetProjectDto } from './dto/getproject.dto';
import { GetProjectIdDto } from './dto/getprojectid.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  async createProject(dto: ProjectDto) {
    const project = await this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        projectCode: String(Math.random()).slice(2, 8),
        users: {
          create: [{ userId: dto.userId }],
        },
      },
    });
    return { message: 'Project created', project };
  }
  async joinProject(dto: JoinProjectDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.userid,
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
  async getProjectBasics(dto: GetProjectDto) {
    const userProjects = await this.prisma.projectUser.findMany({
      where: {
        userId: dto.userid,
      },
      select: {
        project: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    return userProjects.map((p) => p.project); // Extracting the project details
  }
  async findById(dto: GetProjectIdDto) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: dto.id,
      },
    });
    const team = await this.prisma.projectUser.findMany({
      where: {
        projectId: dto.id,
      },
      select: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
    return {
      project: project,
      members: team.map((teamMember) => ({
        email: teamMember.user.email,
        id: teamMember.user.id,
      })),
    };
  }
}
