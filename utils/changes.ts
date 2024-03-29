import { UserManagementType } from "@/types/userManagementType";

export const formatDateString = (dateString: string | undefined): string => {
  const date = new Date(dateString as string);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleString("en-US", options);
};

export const changeFormatDateStringArr = (resultdata: UserManagementType[]) => {
  return resultdata?.map((item: UserManagementType) => ({
    ...item,
    updated_at: formatDateString(item.updated_at),
  }));
};

export const badgeColorChange = (value: string) => {
  if (value === "user") return "#009911";
  if (value === "staff") return "#222299";
  if (value === "admin") return "#993311";
};

export const badgeColorChangeForIsOpenOrClosed = (value: string) => {
  if (value === "1") return "#222299";
  if (value === "0") return "#993311";
};

export const badgeColorChangeForServicesType = (value: string) => {
  if (value === "multiple_visit") return "#009911";
  if (value === "one_visit") return "#222299";
};

export const getBase64 = (file: any, cb: any) => {
  let reader = new FileReader();
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};

export const formatDateYYMMDD = (date: any) => {
  if (date) {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return;
};
