// user.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new HttpException({ message: 'Failed to fetch users' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findById(@Param('id') userId: number): Promise<User> {
    try {
      return await this.userService.findById(userId);
    } catch (error) {
      throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
    }
  }
  @Get('')
  async findByUsername(@Param('username') username: string): Promise<User> {
    try {
      return await this.userService.findByUsername(username);
    } catch (error) {
      throw new HttpException({ message: 'User not found by username' }, HttpStatus.NOT_FOUND);
    }
  }

  @Post('/add-user')
  async create(@Body() user: User): Promise<User> {
    try {
      return await this.userService.create(user);
    } catch (error) {
      throw new HttpException({ message: `Failed to create user: ${error.message}` }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') userId: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.userService.update(userId, updateUserDto);
    } catch (error) {
      throw new HttpException({ message: 'Failed to update user' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') userId: number): Promise<void> {
    try {
      await this.userService.remove(userId);
    } catch (error) {
      throw new HttpException({ message: 'Failed to remove user' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
