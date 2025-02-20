import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
