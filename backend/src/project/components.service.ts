import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addNoteDto } from './dto/note.dto';

@Injectable()
export class ComponentsService {
  constructor(private prisma: PrismaService) {}
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
}
