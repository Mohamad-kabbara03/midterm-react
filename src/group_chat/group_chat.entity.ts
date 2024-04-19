// group-chat.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GroupChatMembers } from './group_chat_members.entity';
import { GroupChatMessages } from './group_chat_messages.entity';

@Entity()
export class GroupChat {
  @PrimaryGeneratedColumn()
  groupId: number;

  @Column()
  groupName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imageURL: string;

  @OneToMany(() => GroupChatMembers, member => member.groupChat)
  members: GroupChatMembers[];

  @OneToMany(() => GroupChatMessages, message => message.groupChat)
  messages: GroupChatMessages[];
}
