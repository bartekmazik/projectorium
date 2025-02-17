import { IsNotEmpty } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  status: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  projectId: number;
  @IsNotEmpty()
  assignedToIds: Array<number>;
}

export class GetTaskDto {
  @IsNotEmpty()
  projectId: number;
  @IsNotEmpty()
  userId: number;
}
