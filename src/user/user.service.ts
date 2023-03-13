/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-users.dto';
import { UpdateUserDTO } from './dto/update-users.dto';
import { UserEntity } from './user.entity';
import { IUser } from './user.interface';
import * as bcrypt from 'bcrypt';
import { AuthUserDTO } from './dto/auth-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(newUser: CreateUserDTO): Promise<IUser | string> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashPassword;

    const existingUser = await this.userRepo.findOneBy({
      email: newUser.email,
    });

    const newUserObject: any = { ...newUser };
    if (newUserObject.id || existingUser) {
      return 'could not create new user';
    }
    return await this.userRepo.save(newUserObject);
  }

  async findOneById(id: number): Promise<IUser> {
    return await this.userRepo.findOneBy({ id });
  }

  async findAll(): Promise<IUser[]> {
    return await this.userRepo.find();
  }

  async update(id: number, user: UpdateUserDTO): Promise<UpdateResult> {
    return await this.userRepo.update(id, user);
  }
  async deleteOneById(id: number): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }

  async loginUser(auth: AuthUserDTO): Promise<string> {
    const user = await this.userRepo.findOneBy({ email: auth.email });
    if (user) {
      const match = await bcrypt.compare(auth.password, user.password);
      if (match) return 'Credentials are correct!';
      return 'Invalid Credentials!';
    }
    return 'Invalid Invalid!';
  }
}
