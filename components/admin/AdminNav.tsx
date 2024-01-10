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
import { MdDarkMode } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
export default function AdminNav() {
  return (
    <Flex
    
      justifyContent={{base:'flex-start',md:"space-between"}}
      alignItems={{base:'flex-start',md:"center"}}
      position="fixed"
      backgroundColor={`rgba(244, 247, 254, 0.1),rgba(11,20,55,0.5)`}
      backdropFilter="saturate(180%) blur(5px)"
      w={{base:"max-content",md:'100%',xl:'80%'}}
      px={{base:"20px",md:'30px',xl:'5px'}}
      py="5px"
      borderRadius="10px"
      zIndex='50'
    >
      <Box  display={{ base: 'none', md: 'block' }}>
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
      {/* <Spacer /> */}
      <Flex bg="#fff"  alignItems='center' gap={3} p='10px' w={{base:'100%',md:'auto'}} borderRadius='80px'    justifyContent='space-between' >
    
<InputGroup >
  <InputLeftElement
    pointerEvents="none"
    // children={<FaSearch color="gray.300"  w='15px' h='15px' mr='10px'/>}
  />
				
  <Input placeholder="Search" borderRadius='30px' fontSize='sm'/>
</InputGroup>
        <Box>
        <IoIosNotifications  size={20}/>
        </Box>
        <Box>
          <MdDarkMode size={20}/>
          </Box>
        <Avatar  name='Leo' size='sm'/>
      </Flex>
    </Flex>
  );
}
