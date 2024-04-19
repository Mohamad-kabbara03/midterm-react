import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { TranslationHistory } from '../translation_history/translation_history.entity';
import { CommunicationSession } from '../communication_session/communication_session.entity';
import { GroupChatMessages } from '../group_chat/group_chat_messages.entity';
import { GroupChatMembers } from '../group_chat/group_chat_members.entity';
import { MultimediaFiles } from '../multimedia_files/multimedia_files.entity';
import { VideoCallSession } from '../video_call_session/video_call_session.entity';
import { UserVREnvironmentSelection } from '../user_vr_environment_selection/user_vr_environment_selection.entity';
import { ChatMessage } from 'src/chat/chat-message.entity';
import { ChatSession } from 'src/chat/chat-session.entity';


@Entity({ name: 'users' }) // Specify the table name
export class User {
  @PrimaryGeneratedColumn({ name: 'userId' })
  userid: number;

  @Column({ name: 'Username', length: 50, unique: true, nullable: true })
  username: string;

  @Column({ name: 'Email', length: 100, unique: true, nullable: true })
  email: string;

  @Column({ name: 'PasswordHash' })
  passwordHash: string;

  @Column({ name: 'DateCreated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;

  @Column({ name: 'LastLogin', type: 'timestamp', nullable: true })
  lastLogin: Date;

  @Column({ name: 'UserStatus', nullable: true  })
  userStatus: string;

  // UserProfile Fields (merged into User entity)
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  profilePictureURL: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  languagePreference: string;


//Relations
  @OneToMany(() => TranslationHistory, translationHistory => translationHistory.user)
  translationHistory: TranslationHistory[];

  @OneToMany(() => CommunicationSession, communicationSession => communicationSession.user)
  communicationSessions: CommunicationSession[];

  @OneToMany(() => GroupChatMessages, groupChatMessage => groupChatMessage.user)
  groupChatMessages: GroupChatMessages[];

  @OneToMany(() => MultimediaFiles, multimediaFile => multimediaFile.user)
  multimediaFiles: MultimediaFiles[];

  @OneToMany(() => VideoCallSession, videoCallSession => videoCallSession.user)
  videoCallSessions: VideoCallSession[];

  @OneToMany(() => UserVREnvironmentSelection, userVREnvironmentSelection => userVREnvironmentSelection.user)
  userVREnvironmentSelections: UserVREnvironmentSelection[];

  @OneToMany(() => GroupChatMembers, groupChatMember => groupChatMember.user)
  groupChatMembers: GroupChatMembers[];

  @OneToMany(() => ChatSession, chatSession => chatSession.user1)
  chatSessions: ChatSession[];

  @OneToMany(() => ChatMessage, chatMessage => chatMessage.sender)
  chatMessages: ChatMessage[]; // Define the property here

}
