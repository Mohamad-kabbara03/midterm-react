// group-chat.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupController } from './group_chat.controller';
import { GroupService } from './group_chat.service';
import { GroupChat } from './group_chat.entity';
import { GroupChatMembers } from './group_chat_members.entity';
import { GroupChatMessages } from './group_chat_messages.entity';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([GroupChat, GroupChatMembers, GroupChatMessages]),
    UserModule
  ],
  
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupChatModule {}
