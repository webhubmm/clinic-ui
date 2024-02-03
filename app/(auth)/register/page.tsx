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
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Link from "next/link";

import { isValidEmail, isValidPhoneNumber } from "@/utils/validation";
import { RegisterType } from "@/types/registerType";
import { userRegister } from "@/lib/register";

interface ShowHideType {
  show: boolean;
  setShow: (value: any) => void;
}

interface CPShowHideType {
  CPshow: boolean;
  setCPShow: (value: any) => void;
}

const Register = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [registerForm, setRegisterForm] = useState<RegisterType>({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [CPshow, setCPShow] = useState(false);
  const toast = useToast();

  const formFillingFun = (type: string, value: string) => {
    setRegisterForm({ ...registerForm, [type]: value });
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

  const isDisabled =
    registerForm.password !== registerForm.password_confirmation ||
    !isValidPhoneNumber(registerForm.phone);

  const validEmail = isValidEmail(registerForm.email);
  const validPassword = registerForm.password.length >= 8;
  const validSituation = validEmail && validPassword;

  const RegisterFun = async () => {
    setIsLoading(true);
    if (!validSituation) {
      toastFun(
        "Error",
        "Wrong Email Pattern , Password must greater than 8 characters ",
        "error"
      );
      setIsLoading(false);
      return null;
    }
    const res = await userRegister(registerForm);
    if (res.code === 400) {
      toastFun("Error", res.data, "error");
      setIsLoading(false);
    }
    if (res.code === 200) {
      toastFun("Success", res.message, "success");
      setIsLoading(false);
      router.push("/login");
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
              Register to Dental Clinic
            </Text>

            <FormControl mb={3}>
              <FormLabel color={"gray"} userSelect={"none"}>
                Name
              </FormLabel>
              <Input
                placeholder="Name"
                size="md"
                color={"black"}
                mb={"0.8rem"}
                _placeholder={{ color: "#6e7581" }}
                onChange={(e) => formFillingFun("name", e.target.value)}
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel color={"gray"} userSelect={"none"}>
                Email address
              </FormLabel>
              <Input
                placeholder="Email"
                size="md"
                color={"black"}
                mb={"0.8rem"}
                _placeholder={{ color: "#6e7581" }}
                onChange={(e) => formFillingFun("email", e.target.value)}
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel color={"gray"} userSelect={"none"}>
                Phone No.
              </FormLabel>
              <Input
                placeholder="Only Myanmar Phone Number"
                size="md"
                color={"black"}
                mb={"0.8rem"}
                _placeholder={{ color: "#6e7581" }}
                onChange={(e) => formFillingFun("phone", e.target.value)}
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
                  _placeholder={{ color: "#6e7581" }}
                  onChange={(e) => formFillingFun("password", e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl mb={3}>
              <FormLabel color={"gray"} userSelect={"none"}>
                Confirm Password
              </FormLabel>
              <InputGroup>
                <InputRightElement>
                  <ConfirmPwShowHideFun CPshow={CPshow} setCPShow={setCPShow} />
                </InputRightElement>
                <Input
                  type={CPshow ? "text" : "password"}
                  placeholder="Confirm Password"
                  size="md"
                  color={"black"}
                  mb={"0.8rem"}
                  _placeholder={{ color: "#6e7581" }}
                  onChange={(e) =>
                    formFillingFun("password_confirmation", e.target.value)
                  }
                />
              </InputGroup>
            </FormControl>

            <Box display={"flex"} justifyContent={"center"} mt={5}>
              <Button
                isLoading={isLoading}
                isDisabled={isDisabled}
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
                onClick={RegisterFun}
              >
                Register
              </Button>
            </Box>
            <Box display={"flex"} mt={6}>
              <Text mr={3}>Already have an account</Text>
              <Link href={"/login"}>
                <Text color={"#05b9de"}>Login</Text>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;

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

function ConfirmPwShowHideFun({ CPshow, setCPShow }: CPShowHideType) {
  return (
    <>
      {CPshow ? (
        <AiFillEye
          onClick={() => setCPShow(false)}
          className=" cursor-pointer"
        />
      ) : (
        <AiFillEyeInvisible
          onClick={() => setCPShow(true)}
          className=" cursor-pointer"
        />
      )}
    </>
  );
}
