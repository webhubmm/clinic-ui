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

const token = Cookies.get("token");
// Set Authorization header using Axios interceptor
// axiosInstance.interceptors.request.use((config) => {
//   // const token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMzc3MzBjMjY3N2FhYjUxOGUyNTRjYWFjZGQ5YmQxNWNlMDIxYzIxZDI3MmI0NWUxN2VlY2MwNDVhYTg4NTA0YjJmMjVmYTQxNmE2YzZiOTAiLCJpYXQiOjE3MDU3NDM0NTUuODM4NTIzLCJuYmYiOjE3MDU3NDM0NTUuODM4NTMzLCJleHAiOjE3MjE0NjgyNTUuODI4OTgzLCJzdWIiOiIxMDIiLCJzY29wZXMiOltdfQ.iXbIEakZlXwgf8dEhIVhtvPCpcXOJS5AYT8LagTCzQ1cxlWYSnALunl-YsvJ6dXBx2M50peW9lrqe-rmdwbF4QouYakWf8F0-cXv4AQW1oyWCF8r7628sUaGYfpOAtVE09cNy3t32n8Vni-pYgSYDACL2DnZUUnUnuc8nfJdyPjo8w5GyafdLMA4XaLNTSLklmk55yDc7pfXSObxkaR37xVEBWKSrPqJ1O9Gss0etn98WsAx_3hZU5lMw7mr-cmStESKcxa47oRusIgsmGhe1GHFhAG36JIY9KvMOxeF2O4MZ8x8ioS8pUEbAID4onYp_hB1dUmdD8wXZw86ujRrB_h7hYFo5LPBp6hX7eYz8JCaqyXiv3BmG6WkEddKwVdAWhv_y1fHwuVPKguavK60xR23XSar9CisDqdX2W0AmK_BQ793SG16HTvF-ReBI8C0kUFMgaoAAz9q-xBIXI3JkIbhAoAHicMdUPayGcN_WYY3Vq0HV5G3_UYA10Mn4wsSxUwWRGEsMHSVR3C3AkGMAw7CrDXKOsieJr_QNnWp57082DXTSmIsHZ6iSWDMVUPK8tFGBtdegiSnkndNv2EwUnQTJToveDTnZPd9V5bZ1F1o2pr1drs6FLN-iPG-A51SMWoXUkf7DWtQO0Uhm8XeX6eWHZN0lJpNAOaP_Ww1RE8";
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

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
export const getUser = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("admin/user_management", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // Use response.data directly, no need for .then(response => response.json())
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors here
    const errorResponse: ErrorResponse = error.response?.data || {
      message: "Unknown error",
    };
    console.error("Error fetching user data:", errorResponse.message);
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

export const updateUser = async (userId: number, updatedUserInfo: userInfo) => {
  return await axiosInstance.patch(
    `admin/user_management${userId}`,
    updatedUserInfo,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
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


export const restoreDeleteUser = async(id:number) =>{
  return await axiosInstance.delete(
    `/admin/user_management/restore/${id}`,
     {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const forceDeleteUser = async(id:number) =>{
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

// Admin API end
