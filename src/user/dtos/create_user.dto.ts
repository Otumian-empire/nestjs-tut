import { IsNotEmpty, IsNumber, IsPositive, Length } from 'class-validator';

export default class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public id: number;

  @IsNotEmpty()
  @Length(3)
  public username: string;
}
