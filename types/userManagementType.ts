import { CookieValueTypes } from "cookies-next";

export interface UserManagementType {
  id?: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  updated_at?: string;
  image: any;
  token?: CookieValueTypes;
}

export interface UserManagementCreateType {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  role: string;
  image: string | null;
  token?: CookieValueTypes;
}
