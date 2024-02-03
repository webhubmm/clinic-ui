import { CookieValueTypes, setCookie } from "cookies-next";
import { centralApi } from "../api-central";
import { saveAuth } from "../auth";
import { RegisterType, registerFetchDataType } from "@/types/registerType";

export const userRegister = async (crediential: RegisterType) => {
  const data = await centralApi("registerAPI", "POST", crediential);
  return data as registerFetchDataType;
};
