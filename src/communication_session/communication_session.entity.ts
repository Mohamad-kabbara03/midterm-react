import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { SessionTranslations } from '../session_translations/session_translations.entity';
import { MultimediaFiles } from '../multimedia_files/multimedia_files.entity';

@Entity()
export class CommunicationSession {
  @PrimaryGeneratedColumn()
  sessionID: number;

  @ManyToOne(() => User, user => user.communicationSessions)
  @JoinColumn({ name: 'UserID' })
  user: User;

  @Column()
  sessionType: string;

  @Column()
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @OneToMany(() => SessionTranslations, sessionTranslation => sessionTranslation.session)
  sessionTranslations: SessionTranslations[];

  @OneToMany(() => MultimediaFiles, multimediaFile => multimediaFile.session)
  multimediaFiles: MultimediaFiles[];
}
