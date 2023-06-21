import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import ReadUserByIdDto from '../dtos/read_user_by_id.dto';
import UserService from '../services/users.service';

@Injectable()
export class GetUserByIdMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  use(req: Request, _res: Response, next: NextFunction) {
    const id: number = Number(req.params.id);

    if (!id || Number.isNaN(id)) {
      throw new HttpException('user id is required', HttpStatus.OK);
    }

    const idObj: ReadUserByIdDto = { id };

    if (idObj.id == 0) {
      throw new HttpException('user id starts from one', HttpStatus.OK);
    }

    const user = this.userService.getUser(idObj.id - 1);

    if (!user) {
      throw new HttpException('user not found', HttpStatus.OK);
    }

    next();
  }
}
