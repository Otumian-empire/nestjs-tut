import ICreateUser from '../interfaces/create_user.interface';

export default class CreateUserDto implements ICreateUser {
  constructor(public id: number, public username: string) {}
}
