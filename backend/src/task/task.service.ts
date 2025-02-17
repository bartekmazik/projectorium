import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async createTask(dto: TaskDto) {
    const { title, status, description, projectId, assignedToIds } = dto;

    const task = await this.prisma.task.create({
      data: {
        title,
        status,
        projectId,
        description,
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
          include: {
            user: true,
          },
        },
        project: true,
      },
    });

    return { message: 'Tasks retrieved', tasks };
  }
}
