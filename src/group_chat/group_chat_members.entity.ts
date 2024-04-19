// group-chat-members.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { GroupChat } from './group_chat.entity';

@Entity()
export class GroupChatMembers {
  @PrimaryGeneratedColumn()
  membersId: number;

  @Column()
  groupId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joinDate: Date;

  @ManyToOne(() => User, user => user.groupChatMembers)
  @JoinColumn({ name: 'userId' })  // Ensure this matches the database column name if different from the entity property name
  user: User;

  @ManyToOne(() => GroupChat, groupChat => groupChat.members)
  @JoinColumn({ name: 'groupId' })
  groupChat: GroupChat;
}
