import { ServicesDataType } from "./servicesDataType";

export interface PackagesDataType {
  id?: string;
  name: string;
  service_id: string;
  price: string;
  discount_price: string;
  note: string;
  timeline: string;
  created_at?: string;
  updated_at?: string;
  service?: ServicesDataType;
  image: any;
}
