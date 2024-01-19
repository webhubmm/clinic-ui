import { loginType } from "@/types/loginType";
import axios from "axios";

const BASE_URL = "https://clinic.neattechmm.com/api/v1";

const axiosInstance = axios.create({ baseURL: BASE_URL });

// Auth routes
export const login = async (loginInfo: loginType) => {
  await axiosInstance.post("login", loginInfo);
};



