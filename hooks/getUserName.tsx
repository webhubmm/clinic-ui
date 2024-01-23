import Cookies from "js-cookie";
const getUserName = () => {
  const username = JSON.parse(Cookies.get("username")?? "");
  return username
};

export default getUserName;
