// chat.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatSession } from './chat-session.entity';
import { ChatMessage } from './chat-message.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @Post('start')
  async startChat(@Body() body: { user1Id: number; user2Id: number }): Promise<ChatSession> {
    const { user1Id, user2Id } = body;
    return this.chatService.startChat(user1Id, user2Id);
  }

  @UseGuards(AuthGuard)
  @Post('send')
  async sendMessage(@Body() body: { senderId: number; receiverId: number; message: string; sessionId: number }): Promise<ChatMessage> {
    const { senderId, receiverId, message, sessionId } = body;
    return this.chatService.sendMessage(senderId, receiverId, message, sessionId);
  }

  @UseGuards(AuthGuard)
  @Get('history/:sessionId')
  async getChatHistoryBySessionId(@Param('sessionId') sessionId: number): Promise<ChatMessage[]> {
    return this.chatService.getChatHistoryBySessionId(sessionId);
  }

  @UseGuards(AuthGuard)
  @Post('session')
  async findOrCreateSession(@Body() body: { user1Id: number; user2Id: number }): Promise<ChatSession> {
    const { user1Id, user2Id } = body;
    return this.chatService.findOrCreateSession(user1Id, user2Id);
  }
}
