import { CookieValueTypes } from "cookies-next";

export interface UserManagementType {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  updated_at?: string;
  token: CookieValueTypes;
}

export interface UserManagementCreateType {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  role: string;
  note: string;
  age: string;
  blood_type: string;
  image: string | null;
  gender: string;
  token: CookieValueTypes;
}
