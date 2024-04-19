// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository'; // Assuming UserRepository is defined in user.repository.ts
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository], // Include UserRepository here
  exports: [UserRepository, TypeOrmModule], // Export UserRepository here as well if needed
})
export class UserModule {}
