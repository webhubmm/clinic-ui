"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { setCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Link from "next/link";
import { UserLogin } from "@/lib/login";
import { getAuth, getToken } from "@/lib/auth";
import { isValidEmail } from "@/utils/validation";

interface FormState {
  email: string;
  password: string;
}

interface ShowHideType {
  show: boolean;
  setShow: (value: any) => void;
}

const Login = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [form, setform] = useState<FormState>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  // const [errorText , setErrorText] = useState('')
  const toast = useToast();

  const formFillingFun = (type: string, value: string) => {
    setform({ ...form, [type]: value });
  };

  const toastFun = (
    condition: string,
    description: string,
    statusInd: "error" | "success"
  ) => {
    toast({
      position: "top-right",
      title: condition,
      description: description,
      status: statusInd,
      duration: 3000,
      isClosable: true,
    });
  };

  //Email && PW Validation

  const validEmail = isValidEmail(form.email);
  const validPassword = form.password.length >= 6;
  const validSituation = validEmail && validPassword;

  useEffect(() => {
    const checkAuth = getAuth();
    const accessToken = getToken();
    if (
      checkAuth === null ||
      accessToken === undefined ||
      accessToken === "" ||
      checkAuth.code === 400
    ) {
      router.push("/login");
    } else if (
      pathname === "/login" &&
      checkAuth !== null &&
      accessToken !== undefined
    ) {
      const userRole = checkAuth.data.user.role;
      console.log("checkAuth :: ", checkAuth);
      if (userRole === "admin") router.push("/dashboard");
      else if (userRole === "staff") router.push("/dashboard/staff");
      else if (userRole === "user") router.push("/");
    }
  }, []);

  const LoginFunc = async () => {
    setIsLoading(true);
    if (!validSituation) {
      toastFun(
        "Error",
        "Wrong Email Pattern , Password must greater than 6 characters ",
        "error"
      );
      setIsLoading(false);
      return null;
    }
    const res = await UserLogin(form);
    if (res.code === 400) {
      toastFun("Error", res.message, "error");
      setIsLoading(false);
    }
    if (res.code === 200) {
      toastFun("Success", res.message, "success");
      setCookie("access_token", res.data.token);
      const userRole = res.data.user.role;
      if (userRole === "admin") router.push("/dashboard");
      else if (userRole === "staff") router.push("/dashboard/staff");
      else if (userRole === "user") router.push("/");
      else router.push("/");
    }
    setIsLoading(false);
  };

  return (
    <Box
      w={"100vw"}
      h={"100vh"}
      display={"flex"}
      bg={"brand.logInBgColor"}
      bgSize={"cover"}
      alignItems={{ sm: "flex-start", md: "center" }}
      justifyContent={"center"}
      p={{ sm: 0, md: "4rem" }}
    >
      <Box
        width={{ base: "100%", md: "70%", lg: "60%", xl: "50%", xxl: "35%" }}
        my={{ base: "4rem", md: 0 }}
        p={{ base: 6, sm: 2, md: 0 }}
      >
        <Link href={"/"}>
          <Box display={"flex"} justifyContent={"center"}>
            <Text>Neat Tech</Text>
          </Box>
        </Link>

        <Box
          display={"flex"}
          mt={5}
          justifyContent={"center"}
          alignItems={{ base: "flex-start", md: "center" }}
        >
          <Box
            w={"100%"}
            px={{ base: "1.75rem", md: "2.3rem" }}
            pb={{ base: "1.75rem", md: "2.3rem" }}
            pt={{ base: "1.75rem", md: "2rem" }}
            bgColor={"white"}
            className="loginShadow"
            borderRadius={7}
          >
            <Text
              fontSize={{ base: "lg", sm: "22px", md: "25px" }}
              textAlign={"center"}
              fontWeight={"bold"}
              userSelect={"none"}
              mb={5}
            >
              Login to Dental Clinic
            </Text>

            <FormControl mb={3}>
              <FormLabel color={"gray"} userSelect={"none"}>
                Email address
              </FormLabel>
              <Input
                placeholder="Email"
                size="md"
                color={"black"}
                mb={"0.8rem"}
                _placeholder={{ color: "white" }}
                onChange={(e) => formFillingFun("email", e.target.value)}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel color={"gray"} userSelect={"none"}>
                Password
              </FormLabel>
              <InputGroup>
                <InputRightElement className="InputLeft">
                  <PwShowHideFun show={show} setShow={setShow} />
                </InputRightElement>
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  size="md"
                  color={"black"}
                  mb={"0.8rem"}
                  _placeholder={{ color: "white" }}
                  onChange={(e) => formFillingFun("password", e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <Box display={"flex"} justifyContent={"center"} mt={5}>
              <Button
                isLoading={isLoading}
                loadingText="Loading"
                width={"100%"}
                variant="solid"
                size="md"
                fontSize={17}
                spinnerPlacement="start"
                bgColor={"#05b9de"}
                color={"white"}
                _hover={{
                  bgColor: "#5cd1e9",
                }}
                transitionDuration={"500ms"}
                onClick={LoginFunc}
              >
                Login
              </Button>
            </Box>
            <Box display={"flex"} mt={6}>
              <Text mr={3}>Not registered yet?</Text>
              <Link href={"/register"}>
                <Text color={"#05b9de"}>Create an Account</Text>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

function PwShowHideFun({ show, setShow }: ShowHideType) {
  return (
    <>
      {show ? (
        <AiFillEye onClick={() => setShow(false)} className=" cursor-pointer" />
      ) : (
        <AiFillEyeInvisible
          onClick={() => setShow(true)}
          className=" cursor-pointer"
        />
      )}
    </>
  );
}
