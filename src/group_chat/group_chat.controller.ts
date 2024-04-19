// group.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { GroupService } from './group_chat.service';
import { GroupChat } from './group_chat.entity';
import { GroupChatMembers } from './group_chat_members.entity';
import { GroupChatMessages } from './group_chat_messages.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  
  // Group Chat Endpoints
  
  @UseGuards(AuthGuard)
  @Get()
  findAllChats(): Promise<GroupChat[]> {
    return this.groupService.findAllGroups();
  }

  @Get(':id')
  findChatById(@Param('id') id: string): Promise<GroupChat> {
    return this.groupService.findGroupById(+id);
  }

  @Post()
  createChat(@Body() groupChatData: Partial<GroupChat>): Promise<GroupChat> {
    return this.groupService.createGroup(groupChatData);
  }

  @Put(':id')
  updateChat(@Param('id') id: string, @Body() groupChatData: Partial<GroupChat>): Promise<GroupChat> {
    return this.groupService.updateGroup(+id, groupChatData);
  }

  @Delete(':id')
  deleteChat(@Param('id') id: string): Promise<void> {
    return this.groupService.deleteGroup(+id);
  }

  // Group Chat Members Endpoints

  @UseGuards(AuthGuard)
  @Get(':id/members')
  findAllMembersByGroupId(@Param('id') groupId: number): Promise<GroupChatMembers[]> {
    return this.groupService.findAllMembersByGroupId(groupId);
  }

  @UseGuards(AuthGuard)
  @Post('members')
  async addMember(@Body() groupChatMemberData: { groupId: number, userId: number }): Promise<GroupChatMembers> {
    try {
      const newMember = await this.groupService.addMember(groupChatMemberData);
      return newMember;
    } catch (error) {
      // Handle errors appropriately
      console.error('Failed to add member:', error);
      throw new Error('Failed to add member due to server error.');
    }
  }
  
  @UseGuards(AuthGuard)
  @Delete('members/remove')
  async removeMember(
    @Query('userId') userId: number,
    @Query('groupId') groupId: number,
  ): Promise<void> {
    return this.groupService.removeMemberByUserIdAndGroupId(userId, groupId);
  }

  // Group Chat Messages Endpoints

  @Get('messages')
  findAllMessages(): Promise<GroupChatMessages[]> {
    return this.groupService.findAllMessages();
  }

  @Post('messages')
  createMessage(@Body() groupChatMessageData: Partial<GroupChatMessages>): Promise<GroupChatMessages> {
    return this.groupService.createMessage(groupChatMessageData);
  }

  @Delete('messages/:id')
  deleteMessage(@Param('id') id: string): Promise<void> {
    return this.groupService.deleteMessage(+id);
  }
}
