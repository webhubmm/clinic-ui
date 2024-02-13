import { CookieValueTypes } from "cookies-next";

export interface TeethManagmentType{
    id:string;
    type:string;
    type_number:string;
  updated_at?: string;
   image:any;
   token:CookieValueTypes  
}

export interface TeethManagmentCreateType{
    type:string;
    type_number:string;
     image: string | null;
   token:CookieValueTypes  
}