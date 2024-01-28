import { useQuery } from "@tanstack/react-query";
import { getUser, showList } from "./api";
import { userInfo, userType } from "@/types/userType";
import { useToast } from '@chakra-ui/react';
import { useDispatch } from "react-redux";
import { setApiUserData } from "./feature/dashboardUserSlice";

export function UserList(page:number,pageSize:number) {
  // console.log("page",page);
  const dispatch = useDispatch();

  return useQuery<userType>({
    queryKey: ['users',page],
    queryFn:() =>getUser(page,pageSize),
    keepPreviousData:true,
   
  });

  


}







  
