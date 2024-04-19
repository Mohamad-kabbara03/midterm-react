import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { IsLengthAndNoSpecialChars } from '../decorators/check.length.chars';

/**
 * DTO class for user authentication
 */
export class AuthUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

/**
 * DTO class for user registration
 */
export class 
RegisterUserDto {

  @IsLengthAndNoSpecialChars(4, 20)
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  dateOfBirth: Date;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  languagePreference: string;


  constructor(username: string,email: string, password: string, firstName: string, lastName: string, dateOfBirth: Date, description: string, languagePreference: string) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.description = description;
    this.languagePreference = languagePreference;
  }
}
