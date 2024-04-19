import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { ChatSession } from './chat-session.entity';

@Entity({ name: 'chat_messages' })
export class ChatMessage {
  @PrimaryGeneratedColumn({ name: 'chatMessageId' })
  chatMessageId: number;

  @ManyToOne(() => User, user => user.chatMessages)
  sender: User;

  @Column({ name: 'messageContent', type: 'text' })
  messageContent: string;

  @Column({ name: 'timestamp', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => User)
  receiver: User;

  @ManyToOne(() => ChatSession)
  @JoinColumn({ name: 'sessionId' }) // Define the foreign key column
  session: ChatSession; 
}

