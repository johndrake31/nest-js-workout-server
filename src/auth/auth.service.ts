import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserCredentials(email: string, password: string): Promise<any> {
    console.log(email, password);
    const user = await this.usersService.loginUser({ email, password });
    return user ?? null;
  }

  async loginWithCredentials(user: UserEntity) {
    console.log('loginWithCredentials');
    const payload = { user };

    return {
      ...user,
      access_token: this.jwtService.sign(payload),
      expiredAt: Date.now() + 60000,
    };
  }
}
