'use client';
import { Card,Flex,Text,Button,Select ,Stack,option} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaCaretDown } from "react-icons/fa";

export default function CreateUser() {
  const router =useRouter();
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
                <Select icon={<FaCaretDown />} placeholder='Name or Email' >
                    <option value='name'>userName </option>
  <option value='email'>Email </option>
                </Select>
                </Stack>
                <Stack spacing={3}>
                   <Button bg='#000' _hover={{
                  background: "#01011",
    
                }} color='#fff' onClick={() => router.push('/dashboard/user/create')}>
                  Create User
                  </Button>
                   <Select icon={<FaCaretDown />} placeholder=' Role '  >
                    <option value='admin'>Admin </option>
  <option value='staff'>Staff </option>
  <option value='user'>User </option>

                </Select>
                  </Stack>
              </Flex>
  )
}
