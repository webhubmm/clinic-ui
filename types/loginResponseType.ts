export interface loginResponseType {
  code: number;
  message: string;
  data: Data;
  error: any;
}

interface Data {
  token: string;
  user: User;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  email_verified_at: any;
  deleted_at: any;
  created_at: string;
  updated_at: string;
}
