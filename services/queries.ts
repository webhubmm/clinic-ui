import { useQuery } from "@tanstack/react-query";
import { getUser } from "./api";
import { userType } from "@/types/userType";
import { useToast } from '@chakra-ui/react';

export function UserList(){
  // console.log(token)
  const toast = useToast();

  return useQuery<userType>({
   queryKey:['user'],
   queryFn:getUser,
  //  queryFn:getUser,

 
  })
}