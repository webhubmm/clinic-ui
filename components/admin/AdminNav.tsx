import {
  BreadcrumbLink,
  BreadcrumbItem,
  Text,
  Box,
  Flex,
  Input,
  Spacer,
  HStack,
  Menu,
  MenuButton,
MenuList,
MenuGroup,
MenuItem,
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
      // justifyContent="space-between"
      alignItems="center"
      position="fixed"
      backgroundColor={`rgba(244, 247, 254, 0.1),rgba(11,20,55,0.5)`}
      backdropFilter="saturate(180%) blur(5px)"
      w={{ base: "max-content", md: "98%", lg: "100%", xl: "80%" }}
      px={{ md: "30px", xl: "5px" }}
      py="8px"
      borderRadius="10px"
      zIndex="50"
      // display={{ base: 'none', md: 'block' }}
    >
      <Box display={{ base: "none", md: "block" }}>
        
        <Text fontSize="35px" fontWeight="bold">
          {" "}
          Main Dashboard
        </Text>
      </Box>
      <Spacer />
      {/* <Flex
        bg="#fff"
        alignItems="center"
        gap={3}
        p="10px"
        borderRadius="80px"
        justifyContent="space-between"
      > */}
        
        <Menu>
          <MenuButton  colorScheme="blue">
                    <Avatar name="Leo" size={{base:'sm',md:'md'}} />

          </MenuButton>
          <MenuList>
            <MenuGroup title="Profile">
              <MenuItem>

              <span>
                Log out
              </span>

              </MenuItem>
              {/* <MenuItem> </MenuItem> */}
            </MenuGroup>
           
          </MenuList>
        </Menu>
      </Flex>
    // </Flex>
  );
}
