import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.loginUser({
      email: username,
      password,
    });
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { ...user };
    if (payload.password) delete payload.password;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
