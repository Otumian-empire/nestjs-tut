import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import CreateUserDto from '../dtos/create_user.dto';

@Injectable()
export class CreateUserTransformPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    // console.log('Create user pipe');
    // here we'd just use this to make sure that the username is not admin
    if (value.username.toLowerCase() === 'admin') {
      throw new HttpException('Username can not be admin', HttpStatus.OK);
    }

    // we can alter the request body here
    return value;
  }
}
