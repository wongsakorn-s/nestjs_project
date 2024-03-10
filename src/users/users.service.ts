import { Injectable } from '@nestjs/common';
import { USERS } from './users.mock';

export type User = any;
@Injectable()
export class UsersService {
  private users = USERS;

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async create(username: string, password: string, role: string = 'user'): Promise<User> {
    const newUser = {
      userId: Math.max(...this.users.map(user => user.userId)) + 1,
      username,
      password,
      role,
    };
    this.users.push(newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}
