import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.userId, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(username: string, password: string): Promise<{ access_token: string }> {
    const existingUser = await this.usersService.findOne(username);
    if (existingUser) {
      throw new ConflictException('Username already taken');
    }
    const newUser = await this.usersService.create(username, password);
    const payload = { sub: newUser.userId, username: newUser.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
