import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addNoteDto } from './dto/note.dto';
import { UserService } from 'src/user/user.service';
import { ChangeStatusDto, TaskDto } from './dto/task.dto';
import { TaskStatus } from '@prisma/client';

import { OpenAIService } from 'src/openai/openai.service';
import { MilestoneStatus, Role } from '@prisma/client';

@Injectable()
export class ComponentsService {
  constructor(
    private prisma: PrismaService,
    private openai: OpenAIService,
    private userLevel: UserService,
  ) {}
  async getRanking(projectId: number, userId?: number) {
    const user = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        users: {
          some: {
            userId: userId,
          },
        },
      },
    });
    if (!user) {
      return 'User not in project';
    }
    const rankingMembers = await this.prisma.projectUser.findMany({
      where: {
        projectId: projectId,
        NOT: [{ role: Role.ADMIN }],
      },
      select: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        pointsCount: true,
      },
    });
    return rankingMembers;
  }
  async addNote(userId, projectId, dto: addNoteDto) {
    const user = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        users: {
          some: {
            userId: userId,
          },
        },
      },
    });
    if (!user) {
      return 'User not in project';
    }
    await this.prisma.note.create({
      data: {
        projectId: projectId,
        userId: userId,
        title: dto.title,
        description: dto.description,
      },
    });
    return { message: 'Note created' };
  }
  async getNotes(userId, projectId) {
    const user = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        users: {
          some: {
            userId: userId,
          },
        },
      },
    });
    if (!user) {
      return 'User not in project';
    }
    const notes = await this.prisma.note.findMany({
      where: {
        projectId: projectId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        createdBy: {
          select: {
            firstName: true,
            lastName: true,
            id: true,
          },
        },
      },
    });
    return { notes };
  }
  async sendMessage(userId, question, projectId) {
    const user = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        users: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        users: {
          include: {
            user: {
              select: {
                firstName: true,
              },
            },
          },
        },
      },
    });
    if (!user) {
      return 'User not in project';
    }
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
      },
      select: {
        name: true,
        description: true,
        _count: {
          select: {
            users: true,
          },
        },
        tasks: true,
      },
    });
    if (!project) {
      return 'project does not exist';
    }
    const promptContent = `You are an AI Mentor in a gamified project management app. Based on the provided project data, tasks, and team performance, answer the question given by user.
When users ask for help, provide:

U should use language which is used in the question below.
Try to keep the response in under 3-5 sentences.
Keep the tone motivating, professional, yet friendly. Avoid generic answers—tailor responses to the user’s context.
Here is the current project data: Project name: ${project.name} Project description: ${project.description} Team size: ${project._count.users} Project tasks: ${project.tasks.map(
      (task) => {
        return task.title;
      },
    )}
    Here is the question you need to answer: ${question.question}`;

    const message = await this.openai.chatCompletion({
      prompt: promptContent,
    });
    if (!message) {
      return 'Something went wrong ';
    }
    let chat = await this.prisma.chat.findFirst({
      where: { projectId, userId },
    });

    if (!chat) {
      chat = await this.prisma.chat.create({
        data: {
          projectId,
          userId,
        },
      });
    }

    await this.prisma.message.create({
      data: {
        chatId: chat.id,
        userId,
        role: 'USER',
        content: question.question,
      },
    });

    await this.prisma.message.create({
      data: {
        chatId: chat.id,
        role: 'MENTOR',
        content: message.content,
      },
    });
    return { message: 'Message sent' };
  }
  async getMessages(userId, projectId) {
    const user = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        users: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        users: {
          include: {
            user: {
              select: {
                firstName: true,
              },
            },
          },
        },
      },
    });
    if (!user) {
      return 'User not in project';
    }
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
      },
      select: {
        name: true,
        description: true,
        _count: {
          select: {
            users: true,
          },
        },
        tasks: true,
      },
    });
    if (!project) {
      return 'project does not exist';
    }
    const chat = await this.prisma.chat.findFirst({
      where: {
        projectId: projectId,
        userId: userId,
      },
    });
    if (!chat) {
      return { message: 'Chat does not exist' };
    }
    const messages = await this.prisma.message.findMany({
      where: {
        chatId: chat.id,
      },
    });
    return { chat: messages };
  }
  async setMilestone(
    userId,
    projectId,
    milestoneData: {
      title: string;
    },
  ) {
    const adminCheck = await this.prisma.project.findFirst({
      where: {
        users: {
          some: {
            user: {
              id: userId,
            },
            role: Role.ADMIN,
          },
        },
        id: projectId,
      },
    });
    if (!adminCheck) {
      return 'Only admin of a project can set milestones';
    }
    const currentMilestones = await this.prisma.milestone.findMany({
      where: {
        projectId: projectId,
      },
    });
    if (currentMilestones.length > 0) {
      await this.prisma.milestone.updateMany({
        data: {
          status: MilestoneStatus.FINISHED,
        },
      });
    }

    await this.prisma.milestone.create({
      data: {
        title: milestoneData.title,
        projectId: projectId,
      },
    });
  }
  //add use case later
  async finishMilestone(userId, projectId, milestoneId) {
    const adminCheck = await this.prisma.project.findFirst({
      where: {
        users: {
          some: {
            user: {
              id: userId,
            },
            role: Role.ADMIN,
          },
        },
        id: projectId,
      },
    });
    if (!adminCheck) {
      return 'Only admin of a project can set milestones';
    }
    const finishDate = new Date();
    await this.prisma.milestone.update({
      where: {
        id: milestoneId,
      },
      data: {
        status: MilestoneStatus.FINISHED,
        completedOn: finishDate,
      },
    });
  }
  async createTask(dto: TaskDto) {
    const { title, description, dueDate, points, projectId, assignedToIds } =
      dto;

    const task = await this.prisma.task.create({
      data: {
        title,
        projectId,
        dueDate,
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
    const userRole = await this.prisma.projectUser.findFirst({
      where: {
        projectId: projectId,
        userId: userId,
      },
      select: {
        role: true,
      },
    });
    if (userRole.role === 'ADMIN') {
      const tasks = await this.prisma.task.findMany({
        where: {
          projectId: projectId,
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
      return {
        message: 'Tasks retrieved',
        tasks,
      };
    }
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
      task.assignedTo.map((user) => {
        return this.userLevel.addExperience(user.userId, taskPoints);
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
