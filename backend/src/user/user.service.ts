import { Injectable } from '@nestjs/common';
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

    if (newExperience >= 10 + newLevel * 5) {
      newLevel = newLevel + 1;
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        experience: newExperience,
        level: newLevel,
      },
    });
  }
}
