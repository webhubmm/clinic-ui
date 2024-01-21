import { useQuery } from "@tanstack/react-query";
import { getUser } from "./api";
import { userType } from "@/types/userType";
import { useToast } from '@chakra-ui/react';

export function UserList(){
  // console.log(token)

  return useQuery<userType>({
   queryKey:['users'],
   queryFn:getUser,
  //  queryFn:getUser,

 
  })
}