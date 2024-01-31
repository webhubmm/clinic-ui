// 'use client';
import { Card,Flex,Text,Button,Select ,HStack,Stack,option} from "@chakra-ui/react";
import Link from "next/link";
import { FaCaretDown } from "react-icons/fa";

export default function CreateUser() {
  // const router =useRouter();
  return (
     <Flex
                p={{md:"25px"}}
                mb={{base:'15px',md:"8px"}}
                justifyContent="space-between"
                align="center"
              >
              <Stack spacing={3}>
                  <Text
                  fontSize="22px"
                  mb="4px"
                  fontWeight="700"
                  lineHeight="100%"
                >
                  User Table
                </Text>
                
                </Stack>
                <HStack spacing={3}>
                   <Button bg='#000' _hover={{
                  background: "#01011",
    
                }} color='#fff'>
                  {/* <Link href='/dashboard/user/create'> */}
                  Trash List
                  {/* </Link> */}
                  </Button>
                   <Button bg='#000' _hover={{
                  background: "#01011",
    
                }} color='#fff'>
                  <Link href='/dashboard/user/create'>
                  Create User
                  </Link>
                  </Button>
                   
                  </HStack>
              </Flex>
  )
}
