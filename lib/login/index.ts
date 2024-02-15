import { CookieValueTypes, setCookie } from "cookies-next";
import { centralApi } from "../api-central";
import { saveAuth } from "../auth";
interface loginType {
  email: string;
  password: string;
}
export const UserLogin = async (crediential: loginType) => {
  const data = await centralApi("loginAPI", "POST", crediential);
  if (data === undefined || data === null) {
    return;
  } else if (data.status === 1) {
    if (typeof window !== "undefined") {
      return data;
    }
  } else {
    if (typeof window !== "undefined") {
      saveAuth(data);
      setCookie("access_token", data.access_token);
      return data;
    }
  }
};
