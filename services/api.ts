import { loginType } from "@/types/loginType";
import { registerType } from "@/types/registerType";
import axios from "axios";

const BASE_URL = "https://clinic.neattechmm.com/api/v1";

const axiosInstance = axios.create({ baseURL: BASE_URL });

// Auth apis start
export const login = async (loginInfo: loginType) => {
  return await axiosInstance.post("login", loginInfo);
};

export const register = async (registerInfo: registerType) => {
  await axiosInstance.post("register", registerInfo);
};
// Auth apis end
