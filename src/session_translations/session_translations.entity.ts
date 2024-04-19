import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CommunicationSession } from '../communication_session/communication_session.entity';

@Entity()
export class SessionTranslations {
  @PrimaryGeneratedColumn()
  SessionTranslationID: number;

  @ManyToOne(() => CommunicationSession, session => session.sessionTranslations)
  @JoinColumn({ name: 'SessionID' })
  session: CommunicationSession;

  @Column()
  SourceText: string;

  @Column()
  TranslatedText: string;

  @Column()
  Timestamp: Date;
}
