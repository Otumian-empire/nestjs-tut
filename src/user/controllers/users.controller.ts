import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Request, Response } from 'express';
import CreateUserDto from '../dtos/create_user.dto';
import ReadUserByIdDto from '../dtos/read_user_by_id.dto';

@Controller('users')
export default class UsersController {
  private users = [
    { id: 1, username: 'Dan' },
    { id: 2, username: 'Moo' },
  ];

  @Get()
  @UsePipes(new ValidationPipe())
  getUsers(
    @Req() _req: Request,
    @Query('reverse', ParseBoolPipe) reverse: boolean,
    @Res() res: Response,
  ) {
    return res.send(reverse ? this.users.reverse() : this.users);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  getUser(
    @Param('id', ParseIntPipe) id: ReadUserByIdDto,
    @Res() res: Response,
  ) {
    return res.json(this.users[Number(id)]);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() newUser: CreateUserDto, @Res() res: Response) {
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
