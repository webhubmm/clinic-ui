import { loginType } from "@/types/loginType";
import { registerType } from "@/types/registerType";
import { userInfo } from "@/types/userType";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

// console.log(token);
const BASE_URL = "https://clinic.neattechmm.com/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const token = Cookies.get('token');


// Auth APIs start
export const login = async (loginInfo: loginType) => {
  return await axiosInstance.post("login", loginInfo);
};

export const register = async (registerInfo: registerType) => {
  return await axiosInstance.post("register", registerInfo);
};

export const logout = async (token: string) => {
  return await axiosInstance.post("logout", null, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
// Auth APIs end

// Admin API start
// start for usermanagment
export const getUser = async (page:number,pageSize:number): Promise<number> => {
  try {
    const response = await axiosInstance.get(`admin/user_management?page=${page}&pageSize=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // Use response.data directly, no need for .then(response => response.json())
    return response.data;
  } catch (error) {
   
    console.error("Error fetching user data:");
    throw error; // Rethrow the error to handle it in the calling code
  }
};

export const createUser = async (userInfo: userInfo) => {
  return await axiosInstance.post("admin/user_management", userInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};



export const updateUser = async ({id,updateData}:{
  id:number;
  updateData:userInfo;
}) => {
  // console.log(id,updateData);
  return await axiosInstance.patch(
    `admin/user_management/${id}`,updateData,
    
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
    // return response.data;

};


// show list
export const userList = async (id: number) => {
  try {
    const res = await axiosInstance.get(`admin/user_management/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log('useedit',res)
    return res.data;
  } catch (error) {
    console.error(error);
  }
};


export const deleteUser = async(id:number) =>{
  return await axiosInstance.delete(
    `/admin/user_management/${id}`,
     {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};


export const restoreUser = async(id:number) =>{
  return await axiosInstance.get(
    `/admin/user_management/restore/${id}`,
     {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const sureDeleteUser = async(id:number) =>{
  return await axiosInstance.delete(
    `/admin/user_management/force_delete/${id}`,
     {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

// end for usermanagment

// for doctorMangment


// Admin API end
