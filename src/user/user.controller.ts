/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Headers,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { AuthUserDTO } from './dto/auth-user.dto';
import { CreateUserDTO } from './dto/create-users.dto';
import { IUser } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServ: UserService) {}

  @Post()
  async createUser(
    @Body() newUser: CreateUserDTO,
  ): Promise<CreateUserDTO | string> {
    return await this.userServ.create(newUser);
  }

  @Post(':login')
  async authUser(@Body() auth: AuthUserDTO): Promise<string> {
    return await this.userServ.loginUser(auth);
  }
  
  @Get(':id')
  async findOne(@Param('id') id): Promise<IUser> {
    return await this.userServ.findOneById(+id);
  }
  @Delete(':id')
  async deleteById(@Param('id') id): Promise<DeleteResult> {
    return await this.userServ.deleteOneById(+id);
  }
  @Get()
  async findAllUsers(): Promise<IUser[]> {
    return await this.userServ.findAll();
  }
}
