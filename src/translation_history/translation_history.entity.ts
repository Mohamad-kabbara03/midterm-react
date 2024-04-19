import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class TranslationHistory {s
  @PrimaryGeneratedColumn()
  TranslationID: number;

  @Column()
  UserID: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'UserID' })
  user: User;

  @Column()
  SourceText: string;

  @Column()
  TranslatedText: string;

  @Column()
  SourceLanguage: string;

  @Column()
  TargetLanguage: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  TranslationDate: Date;
}
