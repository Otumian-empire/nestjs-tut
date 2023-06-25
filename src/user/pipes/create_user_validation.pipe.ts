import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import CreateUserDto from '../dtos/create_user.dto';
import * as Joi from 'joi';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  // constructor(private schema: ObjectSchema) {}
  public constructor() {}

  private schema: Joi.ObjectSchema = Joi.object({
    id: Joi.number().positive().required(),
    username: Joi.string().min(5).max(10).required(),
  });

  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new HttpException(error.message, HttpStatus.OK);
    }

    return value;
  }
}

// const createCatSchema = ;
