import { loginType } from "@/types/loginType";
import { useMutation } from "@tanstack/react-query";
import { login, register } from "./api";
import { registerType } from "@/types/registerType";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
// Auth mutations start
export const useLogin = () => {
  const router = useRouter();
  const toast = useToast();
  return useMutation({
    mutationFn: (loginInfo: loginType) => login(loginInfo),
    onSuccess: (response) => {
      console.log(response);
      // Cookies.set("token", response.token);
      router.push("/dashboard");
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
  });
};
// Auth mutations ends
