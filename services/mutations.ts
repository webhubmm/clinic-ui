import { loginType } from "@/types/loginType";
import { useMutation } from "@tanstack/react-query";
import { createUser, deleteUser, forceDeleteUser, login, register, updateUser ,restoreDeleteUser} from "./api";
import { registerType } from "@/types/registerType";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { userInfo } from "@/types/userType";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setApiUserData } from "./feature/dashboardUserSlice";

// Auth mutations start
export const useLogin = () => {
  const router = useRouter();
  const toast = useToast();
  return useMutation({
    mutationFn: (loginInfo: loginType) => login(loginInfo),
    onSuccess: ({ data: response }) => {
      Cookies.set("token", response.data.token, { expires: 7 });
      Cookies.set("username", JSON.stringify(response.data.user.name), {
        expires: 7,
      });
      console.log(response)
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

export const useLogout = () => {
  const router = useRouter();
  const toast = useToast();
  return useMutation({
    mutationFn: (token: string) => logout(token),
    onSuccess: () => {
      router.push("/");
      Cookies.remove("token");
      Cookies.remove("username");

      toast({
        title: "Logged Out",
        description: "You are successfully logged out",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
  });
};
// Auth mutations ends

// Admin mutation Start
export const useUserCreate = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch();
  // const data =useSelector(state => state?.dashboardData.userList);
//  console.log(data)
  return useMutation({
    mutationFn: (userInfo: userInfo) => createUser(userInfo),
    onMutate: () => {
      console.log("mutate");
    },
    onSuccess: async (data) => {
      console.log(data);
      dispatch(setApiUserData(data));
      await queryClient.invalidateQueries({ queryKey: ["users"] });

      router.push("/dashboard/user");

      toast({
        colorScheme: "green",
        position: "top-right",
        // title: "User created Success",
        title: data.data.message,
        description: "We've created user account.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      console.log("Error", error);
      toast({
        position: "top-right",
        colorScheme: "red",

        title: data.data.message,
        description: "Plase Try Again.",
        // status: error.response.data.data[0],
        duration: 9000,
        isClosable: true,
      });
    },
  });
};

export const useUserUpdate = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  return useMutation<void, Error, { id: number; updateData: userInfo }>({
    mutationFn: ({id,updateData}:{id:number; updateData:userInfo} ) => updateUser({id, updateData}),
    onMutate: () => {
      // dispatch(setApiUserData(newUser));
    // console.log(id,updateData);
      console.log("mutate");
      
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({queryKey:["users"]});

      router.push("/dashboard/user");

      // console.log("User updated successfully:", data);
       toast({
         colorScheme: "green",
        position: "top-right",
        title: "User updated successfully ",
        // description: "Failed to update user. Please try again.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      console.error("Error updating user:", error);

      toast({
        title: "Update Failed",
        description: "Failed to update user. Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });
};

export const useDeleteUser =() =>{
  const queryClient =useQueryClient();
  return useMutation({
     mutationFn:(id:number) => deleteUser(id),
     onSuccess:async (data) =>{
      await queryClient.invalidateQueries({ queryKey: ["users"] });

      console.log(data);
      
      
     },

     
  })
};


export const usePermentDeleteUser =() =>{
  const queryClient =useQueryClient();
  return useMutation({
     mutationFn:(id:number) => forceDeleteUser(id),
     onSuccess:async (data) =>{
      await queryClient.invalidateQueries({ queryKey: ["users"] });

      console.log(data);
     
      
     },

     
  })
};

export const useRestoreUser =() =>{
  const queryClient =useQueryClient();
  return useMutation({
     mutationFn:(id:number) => restoreDeleteUser(id),
     onSuccess:async (data) =>{
      await queryClient.invalidateQueries({ queryKey: ["users"] });

      console.log(data);
      
      
     },

     
  });
};
// Admiin mutations start
