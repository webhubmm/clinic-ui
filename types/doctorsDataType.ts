import { CookieValueTypes } from "cookies-next";
import { BranchesDataType } from "./branchesDataType";

export interface DoctorsDataType {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  degree: string;
  specialize: string;
  created_at?: string;
  updated_at?: string;
  branches: BranchesDataType[] | string[];
  image: any;
  isOldImage?: boolean;
}
