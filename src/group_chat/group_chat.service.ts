// group.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupChat } from './group_chat.entity';
import { GroupChatMembers } from './group_chat_members.entity';
import { GroupChatMessages } from './group_chat_messages.entity';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupChat)
    private readonly groupChatRepository: Repository<GroupChat>,
    @InjectRepository(GroupChatMembers)
    private readonly groupChatMembersRepository: Repository<GroupChatMembers>,
    @InjectRepository(GroupChatMessages)
    private readonly groupChatMessagesRepository: Repository<GroupChatMessages>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Group Chat Methods

  async findAllGroups(): Promise<GroupChat[]> {
    return await this.groupChatRepository.find();
  }

  async findGroupById(id: number): Promise<GroupChat> {
    return await this.groupChatRepository.findOne({ where: { groupId: id } });
  }

  async createGroup(groupChatData: Partial<GroupChat>): Promise<GroupChat> {
    if (!groupChatData.groupName) {
      throw new Error('Group name is required');
    }
    return await this.groupChatRepository.save(groupChatData);
  }

  async updateGroup(id: number, groupChatData: Partial<GroupChat>): Promise<GroupChat> {
    await this.groupChatRepository.update(id, groupChatData);
    return await this.groupChatRepository.findOne({ where: { groupId: id } });
  }

  async deleteGroup(id: number): Promise<void> {
    await this.groupChatRepository.delete(id);
  }

  // Group Chat Members Methods

   // Fetch all members of a specific group
  async findAllMembersByGroupId(groupId: number): Promise<GroupChatMembers[]> {
    return await this.groupChatMembersRepository.find({
      where: { groupChat: { groupId } },  // Filter members by groupId
      relations: ['user', 'groupChat'],  // Optionally load related user and groupChat data
    });
  }

  async addMember(groupChatMemberData: { groupId: number, userId: number }): Promise<GroupChatMembers> {
    // Validate the user
    // Correct usage if the entity's primary key is defined as `userid`
    const user = await this.userRepository.findOne({ where: { userid: groupChatMemberData.userId } });

    if (!user) {
      console.error('User not found with ID:', groupChatMemberData.userId);
      throw new Error('User does not exist');
    }

    // Validate the group chat
    const groupChat = await this.groupChatRepository.findOne({ where: { groupId: groupChatMemberData.groupId } });
    if (!groupChat) {
      console.error('Group chat not found with ID:', groupChatMemberData.groupId);
      throw new Error('Group Chat does not exist');
    }

    // Create new member
    const newMember = this.groupChatMembersRepository.create({
      user: user,
      groupChat: groupChat,
      joinDate: new Date()
    });

    // Save new member
    try {
      const savedMember = await this.groupChatMembersRepository.save(newMember);
      console.log('New member added:', savedMember);
      return savedMember;
    } catch (error) {
      console.error('Failed to add new member:', error);
      throw new Error('Failed to add member due to server error');
    }
  }
  
  

  async removeMemberByUserIdAndGroupId(userId: number, groupId: number): Promise<void> {
    const member = await this.groupChatMembersRepository.findOne({
      where: {
        user: { userid: userId },
        groupChat: { groupId: groupId }
      }
    });

    if (!member) {
      throw new Error('Member not found');
    }

    await this.groupChatMembersRepository.delete(member.membersId);
  }


  // Group Chat Messages Methods

  async findAllMessages(): Promise<GroupChatMessages[]> {
    return await this.groupChatMessagesRepository.find();
  }

  async createMessage(groupChatMessageData: Partial<GroupChatMessages>): Promise<GroupChatMessages> {
    return await this.groupChatMessagesRepository.save(groupChatMessageData);
  }

  async deleteMessage(messageId: number): Promise<void> {
    await this.groupChatMessagesRepository.delete(messageId);
  }
}
