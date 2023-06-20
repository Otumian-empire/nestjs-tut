import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export default class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  public id: number;

  @IsNotEmpty()
  @Length(3)
  public username: string;
}
