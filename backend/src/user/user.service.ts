import { Injectable } from '@nestjs/common';
import { League } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async addExperience(userId: number, pointsToAdd: number): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const newExperience = user.experience + pointsToAdd;
    let newLevel = user.level;
    let newLeague = user.league;

    if (newExperience >= 10 + newLevel * 5) {
      newLevel = newLevel + 1;
    }
    if (newLevel >= 10 && newLevel < 20) {
      newLeague = League.SILVER;
    }
    if (newLevel >= 20 && newLevel < 30) {
      newLeague = League.GOLD;
    }
    if (newLevel >= 30) {
      newLeague = League.DIAMOND;
    }
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        experience: newExperience,
        level: newLevel,
        league: newLeague,
      },
    });
  }
}
