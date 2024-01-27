export interface userType {
      id: number;
    name: string;
   email: string;
    phone: string;
   role: string;
   image?:string | null;
   email_verified_at: any;
   deleted_at: any;
   created_at: string;
   updated_at: string;

}

export interface userInfo {
   name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
    role: string;

}


export interface UserCreateFormData {
   name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  role: string;
}