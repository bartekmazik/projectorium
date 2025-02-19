import { TaskStatus } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  status: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  points: number;
  @IsNotEmpty()
  projectId: number;
  @IsNotEmpty()
  assignedToIds: Array<number>;
}
export class ChangeStatusDto {
  @IsNotEmpty()
  taskid: number;
  @IsNotEmpty()
  status: TaskStatus;
}
