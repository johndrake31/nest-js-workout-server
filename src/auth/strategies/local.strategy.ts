import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('validate...');
    const user = await this.authService.validateUserCredentials(
      email,
      password,
    );
    if (!user) {
      console.log('bob');
      throw new UnauthorizedException();
    }
    return user;
  }
}
