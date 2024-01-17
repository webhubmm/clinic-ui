import { loginType } from "@/types/loginType";
import { useMutation } from "@tanstack/react-query";
import { login } from "./api";

export const useLogin = () => {
  return useMutation({
    mutationFn: (loginInfo: loginType) => login(loginInfo),
  });
};
