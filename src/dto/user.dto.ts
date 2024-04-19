import { IsNotEmpty, IsEmail, MaxLength, IsDateString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username is required' })
  @MaxLength(50, { message: 'Username must be at most 50 characters long' })
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  passwordHash: string;

  // Add the fields from UserProfile
  @IsOptional()
  @MaxLength(50, { message: 'First name must be at most 50 characters long' })
  firstName?: string;

  @IsOptional()
  @MaxLength(50, { message: 'Last name must be at most 50 characters long' })
  lastName?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Invalid date format. Date of birth should be in ISO date string format' })
  dateOfBirth?: string;

  @IsOptional()
  profilePictureURL?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @MaxLength(50, { message: 'Language preference must be at most 50 characters long' })
  languagePreference?: string;
}

export class UpdateUserDto {
  @MaxLength(50, { message: 'Username must be at most 50 characters long' })
  @IsOptional()
  username?: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsOptional()
  email?: string;

  @IsOptional()
  passwordHash?: string;

  // Add the fields from UserProfile
  @IsOptional()
  @MaxLength(50, { message: 'First name must be at most 50 characters long' })
  firstName?: string;

  @IsOptional()
  @MaxLength(50, { message: 'Last name must be at most 50 characters long' })
  lastName?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Invalid date format. Date of birth should be in ISO date string format' })
  dateOfBirth?: string;

  @IsOptional()
  profilePictureURL?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @MaxLength(50, { message: 'Language preference must be at most 50 characters long' })
  languagePreference?: string;
}
