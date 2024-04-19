import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { CommunicationSession } from '../communication_session/communication_session.entity';
import { GroupChat } from '../group_chat/group_chat.entity';

@Entity()
export class MultimediaFiles {
  @PrimaryGeneratedColumn()
  FileID: number;

  @ManyToOne(() => User, user => user.multimediaFiles)
  @JoinColumn({ name: 'UserID' })
  user: User;

  @ManyToOne(() => CommunicationSession, session => session.multimediaFiles)
  @JoinColumn({ name: 'SessionID' })
  session: CommunicationSession;

  @Column()
  FileName: string;

  @Column()
  FileType: string;

  @Column()
  FileSize: number;

  @Column()
  UploadDate: Date;

  @Column({ nullable: true })
  TranslationText: string;
}
