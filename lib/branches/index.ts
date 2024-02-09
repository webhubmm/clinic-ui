import { BranchesDataType } from "@/types/branchesDataType";
import { getToken } from "../auth";

export const EditBranches = async ({
  id,
  name,
  email,
  phone,
  is_open,
  images,
  address,
  created_at,
  updated_at,
  daily_appointment_count,
  open_hour,
  close_hour,
  lat,
  lng,
  user_id,
}: BranchesDataType) => {
  const obj = {
    id,
    name,
    email,
    phone,
    is_open,
    images,
    address,
    daily_appointment_count,
    open_hour,
    close_hour,
    lat,
    lng,
    user_id,
  };
  try {
    const token = getToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/branches/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error :: ", error);
    throw error;
  }
};
