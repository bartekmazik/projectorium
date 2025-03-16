import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ComponentsService } from './components.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { addNoteDto } from './dto/note.dto';

@UseGuards(JwtGuard)
@Controller('project')
export class ComponentsController {
  constructor(private ComponentsService: ComponentsService) {}
  @Get('/:id/ranking')
  getRanking(
    @GetUser() user: User,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.ComponentsService.getRanking(id, user.id);
  }
  @Post('/:id/note')
  addNote(
    @GetUser() user: User,
    @Body() dto: addNoteDto,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.ComponentsService.addNote(user.id, id, dto);
  }

  @Get('/:id/note')
  getNotes(@GetUser() user: User, @Param('id', new ParseIntPipe()) id: number) {
    return this.ComponentsService.getNotes(user.id, id);
  }
  @Post('/:id/chat')
  sendMessage(
    @GetUser() user: User,
    @Body() question: string,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.ComponentsService.sendMessage(user.id, question, id);
  }
  @Get('/:id/chat')
  getMessages(
    @GetUser() user: User,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.ComponentsService.getMessages(user.id, id);
  }
  @Post('/:id/milestone/add')
  addMilestone(
    @GetUser() user: User,
    @Body() milestoneData: { title: string },
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.ComponentsService.setMilestone(user.id, id, milestoneData);
  }
  @Post('/:id/milestone/finish')
  finishMilestone(
    @GetUser() user: User,
    @Body() milestoneId: string,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.ComponentsService.finishMilestone(user.id, id, milestoneId);
  }
}
