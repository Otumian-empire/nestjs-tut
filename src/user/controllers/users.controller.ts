import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import ICreateUser, {
  IReadUserById,
} from '../interfaces/create_user.interface';

@Controller('users')
export default class UsersController {
  private users = [
    { id: 1, username: 'Dan' },
    { id: 2, username: 'Moo' },
  ];

  @Get()
  getUsers(
    @Req() _req: Request,
    @Query('reverse') reverse: boolean,
    @Res() res: Response,
  ) {
    return res.send(reverse ? this.users.reverse() : this.users);
  }

  @Get(':id')
  getUser(@Param('id') id: IReadUserById, @Res() res: Response) {
    return res.json(this.users[Number(id)]);
  }

  @Post()
  createUser(@Body() newUser: ICreateUser, @Res() res: Response) {
    this.users.push({
      id: newUser.id,
      username: newUser.username,
    });

    return res.json({
      message: 'Created',
      users: this.users,
    });
  }
}
