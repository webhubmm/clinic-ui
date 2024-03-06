import { ServicesDataType } from "./servicesDataType";

export interface BlogsDataType {
  id?: string;
  title: string;
  content: string;
  author: string;
  read_time: string;
  created_at?: string;
  updated_at?: string;
  services: ServicesDataType[];
  images?: any;
  isOldImage?: boolean;
}

export interface CreateBlogsDataType {
  title: string;
  content: string;
  author: string;
  read_time: string;
  services: [];
  images?: any;
  isOldImage?: boolean;
}
