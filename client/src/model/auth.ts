export interface ILogin {
  email: string;
  password: string;
}
export interface IRegister extends ILogin {
  name: string;
}

export interface IUser  {
  name:string;
  token:string | null;
}

