"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  Heading,
  InputRightElement,
  Flex,
  Card,
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
import { handleEnter, isValidEmail } from "@/utils/validation";
import { FaGoogle, FaArrowLeft } from "react-icons/fa";
import SinginImg from "@/public/assets/contactForm.png";
import Image from "next/image";
import ContainerBox from "@/components/common/container/Container";

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
    if (res?.code === 400) {
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

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      LoginFunc();
    }
  };

  return (
    <Box bg="neat.pearlwhite">
      <ContainerBox>
        <Box
          h="100vh"
          display="flex"
          alignItems="center"
          justifyContent={{ md: "center" }}
          gap={8}
          overflow="hidden"
        >
          <Card
            padding={{ md: "20px" }}
            boxShadow="md"
            borderRadius="md"
            w="100%"
          >
            <Box
              display="flex"
              alignItems={{ md: "center" }}
              justifyContent={{ md: "center" }}
              gap={8}
              overflow="hidden"
              w="100%"
            >
              <Flex flexDirection="column" gap={{ lg: "20" }}>
                <Flex
                  maxW={{ sm: "100%", md: "100%", lg: "max-content" }}
                  w="100%"
                  mx={{ sm: "auto", xl: "30px" }}
                  marginRight="auto"
                  alignItems="start"
                  justifyContent="center"
                  px={{ sm: "10px", md: "0px" }}
                  flexDirection="column"
                  gap="3"
                >
                  <Link href="/">
                    <Flex alignItems="center" gap={3}>
                      <FaArrowLeft size={20} />
                      <span className="py-3">Back</span>
                    </Flex>
                  </Link>
                  <Box marginRight="auto">
                    <Heading
                      color="neat.secondary"
                      fontSize={{ sm: "30px", md: "36px" }}
                    >
                      Neat Tech
                    </Heading>
                    <Text
                      my="20px"
                      ms="4px"
                      color="brown"
                      fontWeight="500"
                      fontSize="md"
                    >
                      Enter your email and password to sign in!
                    </Text>
                  </Box>

                  <Flex
                    zIndex="2"
                    direction="column"
                    w={{ base: "345px", md: "500px", lg: "420px" }}
                    maxW="100%"
                    background="transparent"
                    borderRadius="15px"
                    mx={{ md: "auto", lg: "unset" }}
                    marginRight="auto"
                    mb={{ base: "20px", md: "auto" }}
                  >
                    {/* <form action="" > */}
                    <FormControl w="100%">
                      <FormLabel
                        display="flex"
                        userSelect={"none"}
                        ms="4px"
                        fontSize="sm"
                        fontWeight="500"
                        color="#000"
                        mb="8px"
                      >
                        Email Address<Text color="#000">*</Text>
                      </FormLabel>
                      <Input
                        isRequired={true}
                        fontSize="sm"
                        w="100%"
                        ms={{ base: "0px", md: "0px" }}
                        type="email"
                        placeholder="Email"
                        onChange={(e) =>
                          formFillingFun("email", e.target.value)
                        }
                        mb="20px"
                        bgColor={"neat.pearlwhite"}
                        fontWeight="500"
                        size="lg"
                        onKeyDown={handleEnter}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        ms="4px"
                        fontSize="sm"
                        fontWeight="500"
                        color="#000"
                        display="flex"
                        userSelect={"none"}
                      >
                        Password<Text color="#000">*</Text>
                      </FormLabel>
                      <InputGroup size="md">
                        <Input
                          isRequired={true}
                          fontSize="sm"
                          placeholder="Password"
                          mb="20px"
                          id="password"
                          size="lg"
                          bgColor={"neat.pearlwhite"}
                          type={show ? "text" : "password"}
                          onChange={(e) =>
                            formFillingFun("password", e.target.value)
                          }
                          onKeyDown={handleEnter}
                        />

                        <InputRightElement
                          display="flex"
                          alignItems="center"
                          mt="4px"
                        >
                          <PwShowHideFun show={show} setShow={setShow} />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Button
                      isLoading={isLoading}
                      loadingText="Loading"
                      type="submit"
                      fontSize="sm"
                      variant="brand"
                      fontWeight="500"
                      w="100%"
                      h="50"
                      mb="20px"
                      bg="#332941"
                      _hover={{
                        bgColor: "brown",
                      }}
                      color="#fff"
                      transitionDuration={"500ms"}
                      onClick={LoginFunc}
                    >
                      Login
                      {/* <Spinner size='sm' /> */}
                    </Button>
                    {/* </form> */}

                    <Flex
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="start"
                      maxW="100%"
                      mt="0px"
                    >
                      <Text color="neat.secondary" fontSize="14px">
                        Not registered yet?{" "}
                        <Link href="/register">
                          <Text as="span" color="brown" fontWeight="600">
                            Create an Account
                          </Text>
                        </Link>
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Box width="450px" display={{ sm: "none", lg: "inline-block" }}>
                <Image
                  src={SinginImg}
                  alt="singinimage"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
            </Box>
          </Card>
        </Box>
      </ContainerBox>
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
