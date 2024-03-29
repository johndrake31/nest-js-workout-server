/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-users.dto';
import { UpdateUserDTO } from './dto/update-users.dto';
import { UserEntity } from './user.entity';
import { IUser } from './user.interface';
import * as bcrypt from 'bcrypt';
import { AuthUserDTO } from './dto/auth-user.dto';
import { createJwt, authJwt } from 'src/shared/auth';
import { isInArray } from 'src/shared/tools/is-in-array';
import { Role } from 'src/shared/types/role.enum';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(newUser: CreateUserDTO): Promise<IUser> {
    const existingUser = await this.userRepo.findOneBy({
      email: newUser.email,
    });
    const existingUserName = {...existingUser}
    if (existingUserName.id || existingUser) {
      throw new ConflictException('User with this email already exists.');
    }
  
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(newUser.password, salt);
  
      const createdUser = await this.userRepo.save({
        ...newUser,
        password: hashPassword,
        roles: ['user'],
      });
  
      return createdUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new ConflictException('Could not create new user.');
    }
  }

  async findOneById(id: number, jwt: string): Promise<IUser| string> {
    const token = await authJwt(jwt);
    if (!token) return 'Invalid token';

    if(isInArray(token.roles, Role.SuperAdmin)|| id === token.id){
      return await this.userRepo.findOneBy({ id });
    }
    return 'invalid request';
  }

  async findAll(jwt: string): Promise<IUser[]| string> {
    const token = await authJwt(jwt);
    if (!token) return 'Invalid token';
    if(isInArray(token.roles, Role.SuperAdmin)){
      return await this.userRepo.find();
    }
    return 'invalid request';
  }

  //TODO: add logic for permision and other stuff
  async update(id: number, user: UpdateUserDTO): Promise<UpdateResult | string> {
    return await this.userRepo.update(id, user);
  }

  async deleteOneById(id: number, jwt:string): Promise<DeleteResult | string> {
    const token = await authJwt(jwt);
    if (!token) return 'Invalid token';
    if(isInArray(token.roles, Role.SuperAdmin ) || id === token.id){
      return await this.userRepo.delete(id);
    }
    return 'invalid request';
  }

  async loginUser(auth: AuthUserDTO): Promise<any> {
    const user = await this.userRepo.findOneOrFail({
      where: { email: auth.email },
      select: ['firstName', 'lastName', 'email', 'roles', 'id', 'password'],
    });
    if (user) {
      const match = await bcrypt.compare(auth.password, user.password);
      if (match) { 
        const payload = {...user};
        delete user.password;
        return {
          access_token: createJwt(payload),
        }; 
      }
      return 'Invalid Credentials!';
    }
    return 'Invalid Invalid!';
  }
}
