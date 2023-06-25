import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import CreateUserDto from '../dtos/create_user.dto';
import UserService from '../services/users.service';
import { CreateUserTransformPipe } from '../pipes/create_user_transform.pipe';
import { CreateUserValidationPipe } from '../pipes/create_user_validation.pipe';

@Controller('users')
export default class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  getUsers(
    @Query('reverse', ParseBoolPipe) reverse: boolean,
    @Res() res: Response,
  ) {
    return res.send(this.userService.getUsers(reverse));
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  getUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    return res.json(this.userService.getUser(id));
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(
    @Body(CreateUserTransformPipe) newUser: CreateUserDto,
    @Res() res: Response,
  ) {
    this.userService.createUser({
      id: newUser.id,
      username: newUser.username,
    });

    return res.json({
      message: 'Created',
      users: this.userService.getUsers(false),
    });
  }

  @Post('validation-pipe')
  @UsePipes(new CreateUserValidationPipe())
  createUserWithValidationPipe(
    @Body() newUser: CreateUserDto,
    @Res() res: Response,
  ) {
    this.userService.createUser({
      id: newUser.id,
      username: newUser.username,
    });

    return res.json({
      message: 'Created',
      users: this.userService.getUsers(false),
    });
  }
}
