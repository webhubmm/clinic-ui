import { loginType } from "@/types/loginType";
import { useMutation } from "@tanstack/react-query";
import { createUser, login, register } from "./api";
import { registerType } from "@/types/registerType";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { userInfo } from "@/types/userType";
import Cookies from "js-cookie";
import { useQueryClient } from '@tanstack/react-query'


// Auth mutations start
export const useLogin = () => {
  const router = useRouter();
  const toast = useToast();
  return useMutation({
    mutationFn: (loginInfo: loginType) => login(loginInfo),
    onSuccess: ({ data: response }) => {
      // console.log(response.data);
      Cookies.set("token", response.data.token,{expires:7});
      Cookies.set("user", JSON.stringify(response.data.user));

      const userRole = response.data.user.role;
      let redirectRoute;

      switch (userRole) {
        case "admin":
          redirectRoute = "/dashboard";
          break;
        case "staff":
          redirectRoute = "/dashboard/staff";
          break;
        case "user":
          redirectRoute = "/";
          break;
        default:
          redirectRoute = "/";
      }

      router.push(redirectRoute);
      toast({
        title: "Logged In",
        description: "Welcome, you are successfully logged in",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  const toast = useToast();
  return useMutation({
    mutationFn: (registerInfo: registerType) => register(registerInfo),
    onSuccess: () => {
      router.push("/signin");
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response.data.data[0],
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });
};
// Auth mutations ends


// Admin mutation Start
export const useUserCreate = () => {
  const queryClient =useQueryClient();

  const router = useRouter();
  const toast = useToast();
  return useMutation({
    mutationFn: (userInfo: userInfo) => createUser(userInfo),
   onMutate:() =>{
    console.log('mutate')
   },
    onSuccess:  async (data) => {
      console.log(data)
      await queryClient.invalidateQueries('users')
     
      router.push('/dashboard/user');

      toast({
        title: "User created",
        description: "We've created user account.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
     onError:(error) =>{
      console.log("Error",error.response.data);
       toast({
        title: error.response.data,
        description: "Plase Try Again.",
        // status: error.response.data.data[0],
        duration: 9000,
        isClosable: true,
      });
    },
 
    
  });
};
// Admiin mutations start