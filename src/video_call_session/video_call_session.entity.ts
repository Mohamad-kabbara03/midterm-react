import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('video_call_sessions') // Specifying the table name is optional but can be helpful for clarity
export class VideoCallSession {
  @PrimaryGeneratedColumn()
  callSessionId: number; // Using camelCase for property names

  @ManyToOne(() => User, user => user.videoCallSessions) // Assuming User entity has a videoCallSessions array
  @JoinColumn({ name: 'userId' }) // The column in the VideoCallSession table that joins to the User table
  user: User;

  @Column({ type: 'timestamp' })
  startTime: Date; // Using camelCase

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date; // Using camelCase

  @Column({ default: false })
  usingVR: boolean; // Using camelCase
}
