import Cookies from "js-cookie";
const getUserName = () => {
  const username = Cookies.get("username");
  if(!username){
    return null
  }
  return JSON.parse(username)
};

export default getUserName;
