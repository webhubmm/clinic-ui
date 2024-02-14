import { CookieValueTypes } from "cookies-next";

export interface HolidayManagmentType{
    id:string;
    date:string;
    note:string;
  updated_at?: string;
   token:CookieValueTypes  
}

export interface HolidayManagmentCreateType{
    date:string;
   note:string;
   token:CookieValueTypes  
}