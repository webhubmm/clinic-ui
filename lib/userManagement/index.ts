import { CookieValueTypes, setCookie } from "cookies-next";

import { getToken, saveAuth } from "../auth";
import { config } from "@/config/config";
import { changeFormatDateStringArr } from "@/utils/changes";
import { UserManagementCreateType } from "@/types/userManagementType";
import { centralApi } from "../api-central";

export interface GetUserType {
  page?: number;
  per_page?: number;
  trash?: boolean | number;
  search?: string;
  token?: CookieValueTypes;
}

export interface EditUserType {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  token: CookieValueTypes;
  image: string | null;
}

//Get All User List

// export const GetAllUserListFun = async (data: GetUserType, pagination: any) => {
//   const obj = {
//     page: pagination.pageIndex + 1,
//     per_page: pagination.pageSize,
//   };

//   return await GetAllUserList({ ...data, ...obj });
// };

export const GetAllUserList = async ({
  page,
  per_page,
  trash,
  search,
}: GetUserType) => {
  try {
    const token = getToken();
    if (!trash) trash = 0;
    const response = await fetch(
      `${config.apiBaseUrl}/admin/user_management?page=${page}&per_page=${per_page}&trash=${trash}&search=${search}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error :: ", error);
    throw error;
  }
};

//Create User
export const CreateUser = async (crediential: UserManagementCreateType) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/user_management`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${crediential.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(crediential),
    }
  );
  const data = await response.json();
  return data;
};

//Update Or Edit User
export const EditUser = async ({
  id,
  name,
  email,
  phone,
  role,
  token,
  image,
}: EditUserType) => {
  const obj = { name, email, phone, role, token, image };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/user_management/${id}`,
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

//Delete User
interface DelObjType {
  id: string;
}

export const userDelete = async (
  { id }: DelObjType,
  token: CookieValueTypes
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/user_management/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

export const userForceDelete = async (
  { id }: DelObjType,
  token: CookieValueTypes
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/user_management/force_delete/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

//Restore User
interface RestoreObjType {
  id: string;
}
export const userRestore = async (
  { id }: RestoreObjType,
  token: CookieValueTypes
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/user_management/restore/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};
