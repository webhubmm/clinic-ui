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
  if (value === "user") return "grey";
  if (value === "staff") return "green";
  if (value === "admin") return "red";
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
