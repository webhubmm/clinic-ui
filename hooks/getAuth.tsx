import { authUserType } from "@/types/authUserType";
import Cookies from "js-cookie";
const getAuth = (): authUserType => {
  return JSON.parse(Cookies.get("user") ?? "");
};

export default getAuth;
