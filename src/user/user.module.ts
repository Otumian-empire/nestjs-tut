import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import UsersController from './controllers/users.controller';
import UserService from './services/users.service';
import CreateUserMiddleware from './middlewares/create_user.middleware';
import UsersMiddleware from './middlewares/users.middleware';
import { GetUserByIdMiddleware } from './middlewares/get_user_by_id.middleware';

@Module({
  controllers: [UsersController],
  providers: [UserService],
})
export default class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsersMiddleware)
      .forRoutes('users' /* , 'posts' */)
      .apply(GetUserByIdMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.GET });

    consumer.apply(CreateUserMiddleware).forRoutes(
      {
        path: 'users',
        method: RequestMethod.POST,
      } /* , { path: 'posts', method: RequestMethod.POST }  */,
    );
    /* .apply(AnotherMiddle) // called after the previous
      .forRoutes(
        {
          path: 'anotherPath',
          method: RequestMethod.METHOD,
        } //, { path: 'someOtherPath', method: RequestMethod.METHOD },
      ); */
  }
}
