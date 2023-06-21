import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export default class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log(req);
    const loggingFormat = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
    };

    console.log(loggingFormat);
    next();
  }
}
