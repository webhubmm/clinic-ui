export interface RegisterType {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export interface registerFetchDataType {
  code: number;
  data: string;
  error: null;
  message: string;
}
