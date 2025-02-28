import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangeStatusDto, TaskDto } from './dto';
import { TaskStatus } from '@prisma/client';

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
            user: {
              select: {
                email: true,
                firstName: true,
                lastName: true,
                id: true,
              },
            },
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
                firstName: true,
                lastName: true,
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
    const completedTasks = await this.prisma.task.findMany({
      where: {
        projectId,
        ...(userId && {
          assignedTo: {
            some: { userId },
          },
        }),
        status: TaskStatus.COMPLETED,
      },
      select: {
        id: true,
      },
    });

    return {
      message: 'Tasks retrieved',
      tasks,
      completedTasks: completedTasks.length,
    };
  }
  async changeTaskStatus(dto: ChangeStatusDto) {
    await this.prisma.task.update({
      where: { id: dto.taskid },
      data: { status: dto.status },
    });

    if (dto.status === TaskStatus.COMPLETED) {
      const task = await this.prisma.task.findUnique({
        where: { id: dto.taskid },
        include: {
          assignedTo: {
            select: { userId: true },
          },
          project: {
            select: { id: true },
          },
        },
      });

      if (!task) {
        throw new Error('Task not found');
      }

      const { assignedTo, project } = task;
      const taskPoints = task.points;

      await this.prisma.projectUser.updateMany({
        where: {
          userId: { in: assignedTo.map((user) => user.userId) },
          projectId: project.id,
        },
        data: {
          pointsCount: { increment: taskPoints },
        },
      });
    }
    if (dto.status === TaskStatus.DELETED) {
      await this.prisma.task.delete({
        where: {
          id: dto.taskid,
        },
      });
    }
  }
}
