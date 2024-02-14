import { api as API } from "@/constant/endpoint";
import { getToken } from "./auth";

const accessToken = getToken();

// for handle 
async function handleResponse(response:any) {
  if (response.status === 204) {
    return Promise.resolve({});
  } else if (response.status >= 200 && response.status < 300) {
    const json = await response.json();
    return Promise.resolve(json);
  } else {
    const error = await response.json();
    return Promise.reject(error);
  }
}

export async function centralApi(
  endpoint: keyof typeof API,
  entry: "POST" | "GET" | "PUT" | "DELETE" | "PATCH",
  data: any
) {
  const accessToken = getToken();

  const finalObj =
    accessToken !== undefined
      ? { ...data, access_token: accessToken }
      : { ...data };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${API[endpoint]}`,
      {
        method: entry,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalObj),
      }
    );
        // return await handleResponse(response);

    const data = await response.json();
    if (data === undefined || data === null) {
      return;
    } else {
      return data;
    }
  } catch (error) {
        // return Promise.reject(error);

    console.log("error ::: ", error);
  }
}

//Get All Lists
export const centralGetAllLists = async (
  endpoint: keyof typeof API,
  data: any
) => {
  const finalObj = { ...data };
  const accessToken = getToken();

  try {
    if (!finalObj.trash) finalObj.trash = 0;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${API[endpoint]}?page=${finalObj.page}&per_page=${finalObj.per_page}&trash=${finalObj.trash}&search=${finalObj.search}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
        // return await handleResponse(response);

    
    const data = await response.json();
    if (data === undefined || data === null) {
      return;
    } else {
    return data;
    }
 
    
  } catch (error) {
    console.log("error ::: ", error);
  }
};

//Edit
export const centralEdit = async (endpoint: keyof typeof API, data: any) => {
  const accessToken = getToken();
  const finalObj = { ...data };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${API[endpoint]}/${finalObj.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalObj),
      }
    );
    const data = await response.json();
    if (data === undefined || data === null) {
      return;
    } else {
      return data;
    }
  } catch (error) {
    console.log("error ::: ", error);
  }
};

//Create
export const centralCreate = async (endpoint: keyof typeof API, data: any) => {
  const finalObj = { ...data };
  const accessToken = getToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${API[endpoint]}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalObj),
      }
    );
    const data = await response.json();
    if (data === undefined || data === null) {
      return;
    } else {
      return data;
    }
  } catch (error) {
    console.log("error ::: ", error);
  }
};

//Delete
export const centralDelete = async (endpoint: keyof typeof API, data: any) => {
  const finalObj = { ...data };
  const accessToken = getToken();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${API[endpoint]}/${finalObj.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data === undefined || data === null) {
      return;
    } else {
      return data;
    }
  } catch (error) {
    console.log("error ::: ", error);
  }
};

//ForceDelete
export const centralForceDelete = async (
  endpoint: keyof typeof API,
  data: any
) => {
  const finalObj = { ...data };
  const accessToken = getToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${API[endpoint]}/${finalObj.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data === undefined || data === null) {
      return;
    } else {
      return data;
    }
  } catch (error) {
    console.log("error ::: ", error);
  }
};

//Restore
export const centralRestore = async (endpoint: keyof typeof API, data: any) => {
  const finalObj = { ...data };
  const accessToken = getToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${API[endpoint]}/${finalObj.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data === undefined || data === null) {
      return;
    } else {
      return data;
    }
  } catch (error) {
    console.log("error ::: ", error);
  }
};
