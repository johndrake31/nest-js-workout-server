import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDTO } from 'src/user/dto/auth-user.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserCredentials(auth: AuthUserDTO): Promise<any> {
    console.log(auth.email, auth.password);
    const user = await this.usersService.loginUser(auth);
    return user ?? null;
  }

  async loginWithCredentials(user: UserEntity) {
    const payload = { user: user };

    return {
      ...user,
      password: 'none-yo-business',
      access_token: this.jwtService.sign(payload),
      expiredAt: Date.now() + 60000,
    };
  }
}
