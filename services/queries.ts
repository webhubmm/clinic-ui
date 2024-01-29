import { useQuery } from "@tanstack/react-query";
import { getUser, showList } from "./api";
import { userInfo, userType } from "@/types/userType";
import { useToast } from '@chakra-ui/react';
import { useDispatch } from "react-redux";
import { setApiUserData } from "./feature/dashboardUserSlice";

export function UserList({page,per_page,trash,search}:{
  page:number;
  per_page:number;
  trash:boolean;
  search:string;
}) {
//  console.log('userlist',page,per_page,trash,search)


  return useQuery<userType>({
    queryKey: ['users',{page,per_page,trash,search}],
    queryFn:() =>getUser({page,per_page,trash,search}),
    keepPreviousData:true,
   
  });

  


}







  
