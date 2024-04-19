// user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }

  async getUserDetailsById(userId: number): Promise<any> {
    try {
      const userDetails = await this.userRepository.findOne({ where: { userid: userId } });
      if (!userDetails) {
        throw new Error('User not found');
      }
      // Return only the necessary user details, excluding sensitive information if any
      return {
        id: userDetails.userid,
        email: userDetails.email,
        // Add more user details as needed
      };
    } catch (error) {
      throw new Error('Error fetching user details: ' + error.message);
    }
  }

  async findById(userId: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { userid: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Failed to fetch user by ID');
    }
  }
  
  async findByUsername(username: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { username: username } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Failed to find user by username');
    }
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
    // or 
    // return this.userRepository.findOneBy({
    //   email: email,
    // });
  }

  async create(user: User): Promise<User> {
    try {
      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to insert user');
    }
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({ where: { userid: userId } });
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }
      
      // Update only the properties that are present in the updateUserDto
      if (updateUserDto.username) {
        existingUser.username = updateUserDto.username;
      }
      if (updateUserDto.email) {
        existingUser.email = updateUserDto.email;
      }
      if (updateUserDto.passwordHash) {
        existingUser.passwordHash = updateUserDto.passwordHash;
      }
      if (updateUserDto.firstName) {
        existingUser.firstName = updateUserDto.firstName;
      }
      if (updateUserDto.lastName) {
        existingUser.lastName = updateUserDto.lastName;
      }
      if (updateUserDto.profilePictureURL) {
        existingUser.profilePictureURL = updateUserDto.profilePictureURL;
      }
      if (updateUserDto.description) {
        existingUser.description = updateUserDto.description;
      }
      if (updateUserDto.languagePreference) {
        existingUser.languagePreference = updateUserDto.languagePreference;
      }
      // Add similar checks for other properties
      
      return await this.userRepository.save(existingUser);
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Failed to update user:', error);
      
      // Rethrow the error with a custom message
      throw new Error('Failed to update user. Please try again later.');
    }
  }

  async remove(userId: number): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ where: { userid: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      await this.userRepository.remove(user);
    } catch (error) {
      throw new Error('Failed to remove user');
    }
  }
}
