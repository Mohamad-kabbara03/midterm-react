import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class VREnvironments {
  @PrimaryGeneratedColumn()
  EnvironmentID: number;

  @Column()
  EnvironmentName: string;

  @Column({ nullable: true })
  Description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreationDate: Date;
}
