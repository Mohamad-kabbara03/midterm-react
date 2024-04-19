import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ExternalAPIs {
  @PrimaryGeneratedColumn()
  APIID: number;

  @Column()
  APIName: string;

  @Column()
  APIKey: string;

  @Column()
  UsageLimit: number;

  @Column({ nullable: true })
  LastUsed: Date;
}
