import { useQuery } from "@tanstack/react-query";
import { getUser } from "./api";
import { userType } from "@/types/userType";
import { useToast } from '@chakra-ui/react';
import { useDispatch } from "react-redux";
import { setApiUserData } from "./feature/dashboardUserSlice";

export function UserList() {
  const dispatch = useDispatch();

  return useQuery<userType>({
    queryKey: ['users'],
    queryFn: getUser,
   
  });

  

  // Rest of your component logic...

  // return { users, isPending, isError };
}