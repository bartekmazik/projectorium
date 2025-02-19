import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangeStatusDto, TaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async createTask(dto: TaskDto) {
    const { title, description, points, projectId, assignedToIds } = dto;

    const task = await this.prisma.task.create({
      data: {
        title,
        projectId,
        description,
        points,
        assignedTo: {
          create: assignedToIds.map((userId) => ({
            user: { connect: { id: userId } },
          })),
        },
      },
      include: {
        assignedTo: {
          include: {
            user: true,
          },
        },
      },
    });

    return { message: 'Task created', task };
  }

  async getTasks(projectId: number, userId?: number) {
    const tasks = await this.prisma.task.findMany({
      where: {
        projectId,
        ...(userId && {
          assignedTo: {
            some: { userId },
          },
        }),
      },
      include: {
        assignedTo: {
          select: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
        project: {
          include: {
            users: {
              where: {
                userId: userId,
              },
              select: {
                role: true,
              },
            },
          },
        },
      },
    });

    return { message: 'Tasks retrieved', tasks };
  }
  async changeTaskStatus(dto: ChangeStatusDto) {
    await this.prisma.task.update({
      where: {
        id: dto.taskid,
      },
      data: {
        status: dto.status,
      },
    });
  }
}
