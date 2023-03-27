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
} from '@nestjs/common';
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
  async createUser(
    @Body() newUser: CreateUserDTO,
  ): Promise<CreateUserDTO | string> {
    return await this.userServ.create(newUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post(':login')
  async authUser(@Body() auth: AuthUserDTO): Promise<any> {
    return await this.userServ.loginUser(auth);
  }
  
  @UseGuards(LocalAuthGuard)
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
