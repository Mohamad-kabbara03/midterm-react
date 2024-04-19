import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthUserDto, RegisterUserDto } from './auth.dto';
import { SkipAuth } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


/**
 * Type alias for the response body of the authenticateUser function.
 */
export type AuthenticateUserResponseBody = {
  access_token?: string;
  message: string;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * No need to wrap in a try-catch.
   * Errors will be resolved to the appropriate
   * response codes by the default exception filter.
   *
   * @param loginDto user login credentials.
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @SkipAuth()
  async authenticateUser(
    @Body() loginDto: AuthUserDto,
  ): Promise<AuthenticateUserResponseBody> {
    /*
     * should return token, or throw an error that will be filtered.
     * No need for try-catch, exception filters will handle errs.
     * */
    const serviceResponse = await this.authService.signIn(
      loginDto?.email,
      loginDto?.password,
    );

    return {
      message: 'Success',
      ...serviceResponse
    };
  }

  /**
   * No need to wrap in a try-catch.
   * Errors will be resolved to the appropriate
   * response codes by the default exception filter.
   *
   * @param registerUserDto
   */
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post('register')
  @SkipAuth()
  async addUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<AuthenticateUserResponseBody> {
    /*
     * should return token, or throw an error that will be filtered.
     * No need for try-catch, exception filters will handle errs.
     * */
    const serviceResponse = await this.authService.register(
      registerUserDto?.username,
      registerUserDto?.email,
      registerUserDto?.password,
      registerUserDto?.firstName,
      registerUserDto?.lastName,
      registerUserDto?.dateOfBirth,
      registerUserDto?.description,
      registerUserDto?.languagePreference
    );

    return {
      message: 'Success',

      ...serviceResponse,
    };
  }

  @UseGuards(AuthGuard)
  @Get('user-details')
  async getUserDetails(@Req() req) {
    try {
      // Assuming req.user contains the user details
      const userDetails = req.user; // Retrieve user details from request
      if (!userDetails) {
        throw new Error('User details not found');
      }
      // Log user details for debugging
      console.log('Retrieved user details:', userDetails);
      // Return user details in the response
      return userDetails;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw new Error('Failed to fetch user details');
    }
  }
}
