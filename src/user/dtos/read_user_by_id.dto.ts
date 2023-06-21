import { IsNotEmpty, IsNumber } from 'class-validator';

export default class ReadUserByIdDto {
  @IsNotEmpty()
  @IsNumber()
  public id: number;
}
