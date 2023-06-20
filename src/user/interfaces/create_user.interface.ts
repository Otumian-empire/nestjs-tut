export default interface ICreateUser {
  id: number;
  username: string;
}

export interface IReadUserById {
  id: number;
}

export interface IReadUser extends ICreateUser {}
