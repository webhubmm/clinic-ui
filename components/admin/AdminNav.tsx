import {
  BreadcrumbLink,
  BreadcrumbItem,
  Text,
  Box,
  Flex,
  Input,
  Spacer,
  HStack,
  Avatar,
  InputGroup,
  Breadcrumb,
  InputLeftElement,
} from "@chakra-ui/react";
import { IoIosNotifications } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";

export default function AdminNav() {
  return (
    <Flex
    
      // justifyContent="space-between"
      alignItems="center"
      position="fixed"
      backgroundColor={`rgba(244, 247, 254, 0.1),rgba(11,20,55,0.5)`}
      backdropFilter="saturate(180%) blur(5px)"
      w="80%"
      px="5px"
      py="3px"
      borderRadius="10px"
      zIndex='50'
    >
      <Box>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Main</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Text fontSize="35px" fontWeight="bold">
          {" "}
          Main Dashboard
        </Text>
      </Box>
      <Spacer />
      <Flex bg="#fff"  alignItems='center' gap={3} p='10px' borderRadius='80px'    justifyContent='space-between' >
        <Input placeholder='Search' borderRadius='30px' paddingX='10px' maxW='70%' bg='#f4f7fe'/>
        <IoIosNotifications  size={20}/>
        <Avatar  name='Leo' size='sm'/>
      </Flex>
    </Flex>
  );
}
