import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { Constants, endpoints } from 'utils/Constants';
import { AddUserDto } from './dto/addUser.dto';
import { Response } from 'express';
import { ApiBody, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags(endpoints.users)
@Controller(endpoints.users)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post(endpoints.signUp)
  @ApiBody({ type: AddUserDto })
  async signUp(@Body() addUserDto: AddUserDto, @Res() response: Response) {
    try {
      const userData = await this.userService.signUpData(addUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: Constants.UserDataAddedSuccess,
        userData,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: Constants.UserDataAddedError,
        error: err.message,
      });
    }
  }

  @Post(endpoints.signIn)
  @ApiBody({ type: LoginDto })
  async signIn(@Body() loginDto: LoginDto, @Res() response: Response) {
    try {
      const signInData = await this.authService.signIn(
        loginDto.emailId,
        loginDto.password,
      );
      return response.status(HttpStatus.OK).json({
        message: Constants.signInSuccess,
        signInData,
      });
    } catch (err) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: Constants.signInError,
        error: err.message,
      });
    }
  }

  @Get(endpoints.getProfileData)
  @ApiSecurity('JWT-auth')
  @ApiQuery({ name: 'id', required: false })
  async getprofileData(@Res() response: Response, @Query('id') id: string) {
    try {
      const userData = await this.userService.getprofileData(id);
      return response.status(HttpStatus.CREATED).json({
        message: Constants.getProfileSuccess,
        userData,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: Constants.getProfileError,
        error: err.message,
      });
    }
  }

  @Get(endpoints.randomJoke)
  @ApiSecurity('JWT-auth')
  async randomJokeData(@Res() response: Response) {
    try {
      const jokeData = await this.userService.randomJokeData();
      return response.status(HttpStatus.CREATED).json({
        message: Constants.randomJokeDataSuccess,
        jokeData,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: Constants.randomJokeDataError,
        error: err.message,
      });
    }
  }
}
