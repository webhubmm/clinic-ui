'use client';
import { Card,Flex,Text,Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
export default function CreateUser() {
  const router =useRouter();
  return (
     <Flex
                p="25px"
                mb="8px"
                justifyContent="space-between"
                align="center"
              >
                <Text
                  fontSize="22px"
                  mb="4px"
                  fontWeight="700"
                  lineHeight="100%"
                >
                  User Table
                </Text>
                <Button bg='#000' _hover={{
                  background: "#01011",
    
                }} color='#fff' onClick={() => router.push('/dashboard/user/create')}>
                  Create User
                  </Button>
              </Flex>
  )
}
