import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { VideoCallSession } from '../video_call_session/video_call_session.entity';
import { VREnvironments } from '../vr_environments/vr_environments.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class UserVREnvironmentSelection {
  @PrimaryGeneratedColumn()
  SelectionID: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'UserID' })
  user: User;

  @ManyToOne(() => VREnvironments)
  @JoinColumn({ name: 'EnvironmentID' })
  Environment: VREnvironments;

  @Column({ type: 'timestamp' })
  SelectionTime: Date;
}
