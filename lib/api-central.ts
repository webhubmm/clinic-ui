import { api as API } from "@/constant/endpoint";
import { getCookie } from "cookies-next";
import axios, { AxiosResponse } from "axios";
import { config } from "@/config/config";

let accesToken: any = "";
if (typeof window !== "undefined") {
  accesToken = getCookie("access_token");
}
export async function centralApi(
  endpoint: keyof typeof API,
  entry: "POST" | "GET" | "PUT" | "DELETE" | "PATCH",
  data?: any
) {
  const finalObj =
    accesToken !== undefined
      ? { ...data, access_token: accesToken }
      : { ...data };

  try {
    const response = await fetch(`${config.apiBaseUrl}${API[endpoint]}`, {
      method: entry,
      headers: {
        // Authorization: `Bearer ${accesToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalObj),
    });
    const data = await response.json();
    if (data === undefined || data === null) {
      return;
    } else {
      return data;
    }
  } catch (error) {
    console.log("error ::: ", error);
  }
}
