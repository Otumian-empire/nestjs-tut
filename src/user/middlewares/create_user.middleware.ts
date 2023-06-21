import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import CreateUserDto from '../dtos/create_user.dto';
import UserService from '../services/users.service';

@Injectable()
export default class CreateUserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  private isExistingUser(data: CreateUserDto) {
    const userExists = this.userService.getUsers(false).filter((row) => {
      return row.id === data.id || row.username === data.username;
    });

    return userExists.length > 0;
  }

  use(req: Request, _res: Response, next: NextFunction) {
    const newUser: CreateUserDto = req.body;

    const isExistingUser = this.isExistingUser(newUser);

    if (isExistingUser) {
      throw new HttpException('Could not create user', HttpStatus.OK);
    }

    return next();
  }
}
