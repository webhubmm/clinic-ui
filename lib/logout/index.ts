("use cleint");
import { CookieValueTypes } from "cookies-next";
import { centralApi } from "../api-central";
import { saveAuth } from "../auth";

export const UserLogout = async (crediential: string) => {
  const data = await centralApi("logoutAPI", "POST", crediential);

  return data;
};
