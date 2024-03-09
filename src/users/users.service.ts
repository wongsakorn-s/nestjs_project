import { Injectable } from '@nestjs/common';
import { USERS } from './users.mock';

export type User = any;

@Injectable()
export class UsersService {
  private users = USERS;

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}