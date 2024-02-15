import { CookieValueTypes } from "cookies-next";

interface PivotType {
  doctor_id: string;
  branch_id: string;
}

export interface BranchesDataType {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at?: string;
  updated_at?: string;
  daily_appointment_count: string;
  is_open: string;
  images: any;
  open_hour: string;
  close_hour: string;
  lat: string;
  lng: string;
  user_id: string;
  pivot?: PivotType;
  token?: CookieValueTypes;
}
