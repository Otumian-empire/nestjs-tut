import { Injectable } from '@nestjs/common';
import CreateUserDto from '../dtos/create_user.dto';

@Injectable()
export default class UserService {
  private users = [
    { id: 1, username: 'Dan' },
    { id: 2, username: 'Moo' },
  ];

  getUsers(reverse: boolean) {
    return reverse ? this.users.reverse() : this.users;
  }

  getUser(id: number) {
    if (id < this.users.length) return this.users[id];
    return null;
  }

  createUser(data: CreateUserDto) {
    const userExists = this.users.filter(
      (row) => row.id === data.id || row.username === data.username,
    );

    if (userExists.length > 0) {
      return false;
    }

    this.users.push(data);
    return true;
  }
}
