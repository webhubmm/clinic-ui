'use client'
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
  Container // Import the Checkbox component
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { FaGoogle ,FaArrowLeft} from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import Link from 'next/link';  // Import Link instead of NavLink

export default function SignIn() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Container bg="#f4f7fe">
      <Link href='/'  className='my-8'>
      <Flex alignItems='center' gap={3} >
      <FaArrowLeft size={20}/>
      <span>Back To Home</span>
      </Flex>
      </Link>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "30px" }}
        marginRight="auto"
        alignItems="start"
        justifyContent="center"
        px={{ base: "25px", md: "0px" }}
        flexDirection="column"
      >
        <Box marginRight="auto">
          <Heading color="#000" fontSize="36px" mb="10px">
            Medical Care
          </Heading>
          <Text mb="36px" ms="4px" color="#000" fontWeight="400" fontSize="md">
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
          mb={{ base: "20px", md: "auto" }}
        >
          <Button
            fontSize="sm"
            marginRight="0px"
            mb="26px"
            py="15px"
            h="50px"
            borderRadius="16px"
          >
            <FaGoogle  size={20}/>
            <span className='ml-3'>Sign in with Google</span>
          </Button>
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color="#000"
              mb="8px"
            >
              Email<Text color="#000">*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              fontWeight="500"
              size="lg"
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color="#000"
              display="flex"
            >
              Password<Text color="#000">*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Text onClick={handleClick}>
                  {show ? <RiEyeCloseLine /> : <MdOutlineRemoveRedEye />}
                </Text>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Flex justifyContent="space-between" align="center" mb="24px">
            <FormControl display="flex" alignItems="center">
              <Checkbox
                id="remember-login"
                colorScheme="brandScheme"
                me="10px"
              />
              <FormLabel
                htmlFor="remember-login"
                mb="0"
                fontWeight="normal"
                color="#000"
                fontSize="sm"
              >
                Keep me logged in
              </FormLabel>
            </FormControl>
            <Link href="/auth/forgot-password" color="#000" fontSize="sm" fontWeight="500">
                  Forgot password?
            </Link>
          </Flex>
          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
            bg='#332941'
            color='#fff'
          >
            Sign In
          </Button>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color="#000" fontWeight="400" fontSize="14px">
              Not registered yet?{" "}
              <Link href="/auth/sign-up">
                Create an Account
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
