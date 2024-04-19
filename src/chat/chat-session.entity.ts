import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { ChatMessage } from './chat-message.entity';

@Entity({ name: 'chat_sessions' })
export class ChatSession {
  @PrimaryGeneratedColumn({ name: 'sessionId' })
  sessionId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user1Id' }) // Define the foreign key column
  user1: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user2Id' }) // Define the foreign key column
  user2: User;

  @OneToMany(() => ChatMessage, message => message.session)
  messages: ChatMessage[];
}
