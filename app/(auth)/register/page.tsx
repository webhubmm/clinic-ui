"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Card
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
import SinginImg from "@/public/assets/contactForm.png";
import Image from 'next/image';
import ContainerBox from "@/components/common/container/Container";

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
  
    <Box bg='neat.pearlwhite'   overflow="hidden">
    <ContainerBox>

     <Box
    display='flex'
      
      alignItems="center"
      justifyContent="space-evenly"
      gap={10}
       h="100vh">
        <Card padding={{sm:'5px',md:'20px'}} boxShadow='md' borderRadius='md'
    w='100%'
      >
    <Box display='flex'
      
      alignItems={{md:"center"}}
      justifyContent={{md:"center"}}
      gap={8}
      overflow="hidden"
      w='100%'
      >
        

        <Box
          display={"flex"}
          maxW={{ sm: "100%", md:'100%',lg: "max-content" }}
          w="100%"
          mx={{ sm: "auto", xl: "30px" }}
          marginRight="auto"
          alignItems="start"
          justifyContent="center"
          px={{ sm: "5px", md: "0px" }}
          flexDirection="column"
          gap='3'
        >
          <Box
            w={{ base: "100%", md:'80%',lg: "420px" }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: "auto", lg: "unset" }}
            marginRight="auto"
            mb={{ base: "20px", md: "auto" }}
          >
             <Link href={"/"}>
          <Box display={"flex"} justifyContent={"center"} >
            <Text
            color='neat.secondary'
             fontSize={{ base: "lg", sm: "22px", md: "25px" }}
              textAlign={"center"}
              fontWeight={"bold"}
              userSelect={"none"}
            >Neat Tech</Text>
          </Box>
        </Link>
             <FormControl mb={3}>
               <FormLabel 
              display="flex"
              
                  userSelect={"none"}
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color="#000"
                  mb="5px">
               
                 Name
               </FormLabel>
               <Input
                placeholder="Name"
                fontSize="sm"
                 
                  ms={{ base: "0px", md: "0px" }}
                 
                  mb="10px"
                  bgColor={"neat.pearlwhite"}
                  fontWeight="500"
                  size="lg"
                onChange={(e) => formFillingFun("name", e.target.value)}
              />
            </FormControl>

                          <FormControl>
                <FormLabel
                  display="flex"
                  userSelect={"none"}
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color="#000"
                  mb="5px">
                  Email Address<Text color="#000">*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  fontSize="sm"
                 
                  ms={{ base: "0px", md: "0px" }}
                  mb="10px"
                  bgColor={"neat.pearlwhite"}
                  fontWeight="500"
                  size="lg"
                  placeholder="Email"
                  onChange={(e) => formFillingFun("email", e.target.value)}
                />
               
              </FormControl>

            <FormControl mb={3}>
               <FormLabel
                  display="flex"
                  userSelect={"none"}
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color="#000"
                  mb="5px">
                  Phone Number<Text color="#000">*</Text>
                </FormLabel>
              <Input
                placeholder="Only Myanmar Phone Number"
                  isRequired={true}
                  fontSize="sm"
                 
                  ms={{ base: "0px", md: "0px" }}
                  mb="10px"
                  bgColor={"neat.pearlwhite"}
                  fontWeight="500"
                  size="lg"
                onChange={(e) => formFillingFun("phone", e.target.value)}
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

                    mb="10px"
                    id="password"
                    size="lg"
                    bgColor={"neat.pearlwhite"}
                  type={show ? "text" : "password"}
                  onChange={(e) => formFillingFun("password", e.target.value)}
                  
                  
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

              <FormControl>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color="#000"
                  display="flex"
                  userSelect={"none"}
                  >
                   Confirm Password<Text color="#000">*</Text>
                </FormLabel>
                <InputGroup size="md">
                 
                  <Input
                    isRequired={true}
                    fontSize="sm"
                                     placeholder="Password"

                    mb="10px"
                    
                    size="lg"
                    bgColor={"neat.pearlwhite"}
                  type={CPshow ? "text" : "password"}
                  onChange={(e) =>   formFillingFun("password_confirmation", e.target.value)}
                  
                  
                  />
                 
                 <InputRightElement  
                  display="flex"
                    alignItems="center"
                    mt="4px"
                  >
                 <ConfirmPwShowHideFun CPshow={CPshow} setCPShow={setCPShow} />
                 </InputRightElement>
                </InputGroup>
              </FormControl>
 

           
            <Box display={"flex"} justifyContent={"center"} mt={5}>
               <Button
              isLoading={isLoading}
                loadingText="Loading"
             type="submit"
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="100%"
                h="50"
                mb="10px"
                bg="#332941"
                 _hover={{
                  bgColor: "brown",
                }}
                color="#fff"
                transitionDuration={"500ms"}
                onClick={RegisterFun}
                >
                   Register
                  {/* <Spinner size='sm' /> */}
               
              </Button>
              
            </Box>
            <Box display={"flex"} mt={6}>
              <Text mr={3} color='neat.secondary'>Already have an account</Text>
              <Link href={"/login"}>
                <Text color={"brown"} fontWeight='600'>Login</Text>
              </Link>
            </Box>
          </Box>
        </Box>

        <Box   mb='40px' width="450px" display={{sm:'none',lg:"inline-block"}} >
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


