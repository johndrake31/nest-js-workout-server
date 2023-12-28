/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Headers,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { DeleteResult } from 'typeorm';
import { AuthUserDTO } from './dto/auth-user.dto';
import { CreateUserDTO } from './dto/create-users.dto';
import { IUser } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServ: UserService) {}

  @Post()
async createUser(@Body() newUser: CreateUserDTO, @Res() response: Response): Promise<IUser | { error: string }> {
  try {
    const user = await this.userServ.create(newUser);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    response.status(HttpStatus.FORBIDDEN).json({
      message: 'email already exists',
    });
  }
}
  @UseGuards(LocalAuthGuard)
  @Post(':login')
  async authUser(@Body() auth: AuthUserDTO): Promise<any> {
    return await this.userServ.loginUser(auth);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(
    @Param('id') id,
    @Headers('Authorization') jwt: string,
  ): Promise<IUser | string> {
    return await this.userServ.findOneById(+id, jwt);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteById(
    @Param('id') id: number | string,
    @Headers('Authorization') jwt: any,
  ): Promise<DeleteResult | string> {
    return await this.userServ.deleteOneById(+id, jwt);
  }

  //TODO: ADD ROLES GUARD
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAllUsers(@Headers('Authorization') jwt: string): Promise<IUser[]| string> {
    return await this.userServ.findAll(jwt);
  }
}
