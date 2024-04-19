import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import * as process from 'process';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { hash } from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * @param email email of the user to sign in.
   * @param pass un-hashed user password to sign in.
   * @returns an object containing a user token valid for
   *          the duration specified in the environment.
   * @throws UnauthorizedException if the credentials are invalid.
   * @throws NotFoundException if the user does not exist.
   * @throws BadRequestException if any data is missing.
   * @throws HttpException with HttpStatus.INTERNAL_SERVER_ERROR for other errors.
   */
  async signIn(email: string, pass: string): Promise<{ message: string, access_token: string, userId: number }> {
    /* check for missing data */
    if (!email || !pass) {
      /* status code is 400 */
      throw new BadRequestException('Missing Data');
    }
  
    /* fetch user */
    const user: User | null = await this.userService.findUserByEmail(email);
    /* Check if user exists */
    if (!user) {
      /* status code is 404 */
      throw new NotFoundException('User does not exist');
    }
  
    /* stores pass and hashed pass comparison */
    let correct: boolean;
    try {
      correct = await compare(pass, user.passwordHash);
    } catch (e) {
      this.logger.fatal(e);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  
    /* Check for mismatch */
    if (!correct) {
      /* status code is 401 */
      throw new UnauthorizedException('Cannot login with these credentials');
    }
  
    /* payload to be added to the JWT token */
    const payload = { sub: user.userid, email: user.email, userId: user.userid }; // Include userId in payload
  
    const expiresIn = '3600s'; // or any other duration
    return {
      message: 'Success',
      access_token: await this.jwtService.signAsync(payload, { expiresIn }),
      userId: user.userid // Return the userId along with the access token
    };
  }

  /**
   * @param username
   * @param email
   * @param pass
   * @returns an object containing a user token valid for
   *          the duration specified in the environment.
   * @throws UnauthorizedException if username is not unique or if email is not unique.
   * @throws BadRequestException if any data is missing.
   * @throws HttpException with HttpStatus.INTERNAL_SERVER_ERROR for other errors.
   */
  async register(
    username: string,
    email: string,
    pass: string,
    first_name: string,
    last_name: string,
    dateOfBirth: Date,
    description: string,
    languagePreference: string

     
  ): Promise<{ access_token: string }> {
    // Check for missing data
    if (!email || !pass) {
      throw new BadRequestException('Missing Data');
    }

    // Check if email is taken
    const emailUser: User | null = await this.userService.findUserByEmail(email);
    if (emailUser) {
      throw new UnauthorizedException('Email exists');
    }

    try {
      // Hash the password
      const hashedPassword = await hash(pass, 10); // 10 is the number of salt rounds

      // Create user object
      const userToCreate: User = new User();
      userToCreate.username = username;
      userToCreate.email = email;
      userToCreate.passwordHash = hashedPassword; // Save hashed password
      userToCreate.firstName = first_name;
      userToCreate.lastName = last_name;
      userToCreate.dateOfBirth = dateOfBirth ;
      userToCreate.description = description;
      userToCreate.languagePreference = languagePreference;

      // Insert user into the database
      const user: User = await this.userService.create(userToCreate);
      console.log(user)
      // Generate JWT token
      return await this.signIn(user.email, pass);
    } catch (e) {
      this.logger.fatal(e);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}