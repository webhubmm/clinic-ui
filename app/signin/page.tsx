"use client";
import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  FormErrorMessage,
  Container, // Import the Checkbox component
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { FaGoogle, FaArrowLeft } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import Link from "next/link"; // Import Link instead of NavLink
import Image from "next/image";
import SinginImg from "@/public/assets/asset 5.webp";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogin } from "@/services/mutations";
import { loginType } from "@/types/loginType";

export default function SignIn() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginType>();

  const loginMutation = useLogin();

  const handleLoginSubmit: SubmitHandler<loginType> = (data: loginType) => {
    loginMutation.mutate(data);
  };

  return (
    <Flex
      bg="#f4f7fe"
      alignItems="center"
      justifyContent="center"
      gap={8}
      h="100vh">
      <Flex flexDirection="column">
        <Link href="/">
          <Flex alignItems="center" gap={3}>
            <FaArrowLeft size={20} />
            <span className="py-3">Go To Home</span>
          </Flex>
        </Link>
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w="100%"
          mx={{ base: "auto", xl: "30px" }}
          marginRight="auto"
          alignItems="start"
          justifyContent="center"
          px={{ base: "25px", md: "0px" }}
          flexDirection="column">
          <Box marginRight="auto">
            <Heading color="#000" fontSize="36px" mb="5px">
              Medical Care
            </Heading>
            <Text
              mb="20px"
              ms="4px"
              color="#000"
              fontWeight="400"
              fontSize="md">
              Enter your email and password to sign in!
            </Text>
          </Box>

          <Flex
            zIndex="2"
            direction="column"
            w={{ base: "100%", md: "420px" }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: "auto", lg: "unset" }}
            marginRight="auto"
            mb={{ base: "20px", md: "auto" }}>
            <Button
              fontSize="sm"
              marginRight="0px"
              mb="26px"
              py="15px"
              h="50px"
              borderRadius="16px"
              _hover="#332941">
              <FaGoogle size={20} />
              <span className="ml-3">Sign in with Google</span>
            </Button>
            <form action="" onSubmit={handleSubmit(handleLoginSubmit)}>
              <FormControl>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color="#000"
                  mb="8px">
                  Email<Text color="#000">*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  fontSize="sm"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  ms={{ base: "0px", md: "0px" }}
                  type="email"
                  placeholder="mail@simmmple.com"
                  mb="20px"
                  bgColor={"#fff"}
                  fontWeight="500"
                  size="lg"
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color="#000"
                  display="flex">
                  Password<Text color="#000">*</Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    isRequired={true}
                    fontSize="sm"
                    placeholder="Min. 8 characters"
                    mb="20px"
                    id="password"
                    size="lg"
                    bgColor={"#fff"}
                    type={show ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                  <InputRightElement
                    display="flex"
                    alignItems="center"
                    mt="4px">
                    <Text onClick={handleClick}>
                      {show ? <RiEyeCloseLine /> : <MdOutlineRemoveRedEye />}
                    </Text>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                type="submit"
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="100%"
                h="50"
                mb="20px"
                bg="#332941"
                color="#fff">
                Sign In
              </Button>
            </form>

            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="start"
              maxW="100%"
              mt="0px">
              <Text color="#000" fontWeight="400" fontSize="14px">
                Not registered yet?{" "}
                <Link href="/signup">
                  <span className="text-sm font-semibold">
                    Create an Account
                  </span>
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Box>
        <Image
          src={SinginImg}
          alt="singinimage"
          width={0}
          height={0}
          sizes="95vw"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    </Flex>
  );
}
