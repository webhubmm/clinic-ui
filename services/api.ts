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

// Auth APIs start
export const login = async (loginInfo: loginType) => {
  return await axiosInstance.post("login", loginInfo);
};

export const register = async (registerInfo: registerType) => {
  return await axiosInstance.post("register", registerInfo);
};

export const logout = async(token:string) =>{
  return await axiosInstance.post("logout", null,{
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', 
    }});
}
// Auth APIs end

// Admin API start
export const getUser = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get('admin/user_management');
    // Use response.data directly, no need for .then(response => response.json())
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors here
    const errorResponse: ErrorResponse = error.response?.data || { message: "Unknown error" };
    console.error("Error fetching user data:", errorResponse.message);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

export const createUser = async (userInfo:userInfo) =>{
 return await axiosInstance.post('admin/user_management',userInfo)
}


  
// Admin API end
