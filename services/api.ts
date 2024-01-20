import { loginType } from "@/types/loginType";
import { registerType } from "@/types/registerType";
import axios from "axios";
import Cookies from "js-cookie";
const token =Cookies.get("token");
// console.log(token);
const BASE_URL = "https://clinic.neattechmm.com/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});

// Auth APIs start
export const login = async (loginInfo: loginType) => {
  return await axiosInstance.post("login", loginInfo);
};

export const register = async (registerInfo: registerType) => {
  await axiosInstance.post("register", registerInfo);
};
// Auth APIs end

// Admin API start
export const getUser = async () => {
 await  axiosInstance.get('/admin/user_managment',{headers:{
   'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
}})


  // try {
  //   const response = await axiosInstance.get('/admin/user_managment', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     }
  //   });

    // Use response.data directly, no need for .then(response => response.json())
    // console.log(response.data);
    // return response.data;
  // } catch (error) {
    // Handle errors here
    // console.error("Error fetching user data:", error);
    // throw error; // Rethrow the error to handle it in the calling code
  // }
};
// Admin API end
