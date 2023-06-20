import { Module } from '@nestjs/common';
import UsersController from './controllers/users.controller';

@Module({
  controllers: [UsersController],
})
export default class UserModule {}
