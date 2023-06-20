import { Injectable } from '@nestjs/common';
import CreateUserDto from '../dtos/create_user.dto';
import ReadUserByIdDto from '../dtos/read_user_by_id.dto';

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
    return this.users[id];
  }

  createUser(data: CreateUserDto) {
    this.users.push(data);
  }
}
