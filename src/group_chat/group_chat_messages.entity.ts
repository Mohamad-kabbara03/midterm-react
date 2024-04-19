// group-chat-messages.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { GroupChat } from './group_chat.entity';

@Entity()
export class GroupChatMessages {
  @PrimaryGeneratedColumn()
  messageId: number;

  @Column()
  groupId: number;

  @Column()
  userId: number;

  @Column()
  messageText: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => User, user => user.groupChatMessages)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => GroupChat, groupChat => groupChat.messages)
  @JoinColumn({ name: 'groupId' })
  groupChat: GroupChat;
}
