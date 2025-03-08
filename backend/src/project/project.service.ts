import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectDto } from './dto';
import { JoinProjectDto } from './dto/joinproject.dto';
import { Role } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  async createProject(dto: ProjectDto, userid: number) {
    const project = await this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        projectCode: String(Math.random()).slice(2, 8),
        users: {
          create: [{ userId: userid, role: Role.ADMIN }],
        },
      },
    });
    return { message: 'Project created', project };
  }
  async joinProject(dto: JoinProjectDto, userid: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userid,
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
  async getProjectBasics(userid) {
    const userProjects = await this.prisma.projectUser.findMany({
      where: {
        userId: userid,
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
  async findProjectById(projectid: number, userid: number) {
    const user = await this.prisma.project.findFirst({
      where: {
        users: {
          some: {
            user: {
              id: userid,
            },
          },
        },
      },
    });

    if (!user) {
      return 'user not in this project';
    }
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectid,
      },
      select: {
        name: true,
        description: true,
        projectCode: true,

        users: {
          select: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            role: true,
          },
        },
      },
    });

    return {
      project,
    };
  }
}
