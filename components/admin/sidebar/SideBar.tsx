"use client";
import {
  Box,
  Flex,
  Text,
  List,
  ListItem,
  HStack,
  Stack,
  Spacer
} from "@chakra-ui/react";
import { FaHome, FaLock ,FaUser ,FaCodeBranch ,FaUsers ,FaAddressBook,FaCalendarDay} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineRateReview ,MdReport} from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { FiPackage } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";

const NavLinks = [
  { id: 1, name: "Home", path: "/dashboard", icons: <FaHome size={20} /> },
  {
    id: 2,
    name: "Data Tables",
    path: "/dashboard/table",
    icons: <SiGoogleanalytics size={20} />,
  },
  {
    id: 3,
    name: "User Managment",
    path: "/dashboard/user",
    icons: <FaUsers size={22} />,
  },
  {
    id: 4,
    name: "Branch Managment",
    path: "/dashboard/branch",
    icons: <FaCodeBranch size={20} />,
  },
  {
    id: 5,
    name: "Staff Panel Features ",
    path: "/dashboard/staff",
    icons: <FaUser size={20} />,
  },
  { id: 6, name: "Packages Management", path: "/dashboard/packages", icons: <FiPackage size={22} /> },
  {
    id: 7,
    name: "Doctor Management",
    path: "/dashboard/doctor",
    icons: <FaUserDoctor size={20} />,
  },
  {
    id: 8,
    name: "Booking Managment",
    path: "/dashboard/booking",
    icons: <FaAddressBook size={22} />,
  },
   { id: 9, name: "Tooth Managment", path: "/dashboard/tooth", icons: <MdOutlineRateReview size={22} /> },
  {
    id: 10,
    name: "Holiday Managment",
    path: "/dashboard/holiday",
    icons: <FaCalendarDay size={20} />,
  },
  {
    id: 11,
    name: "Report ",
    path: "/dashboard/report",
    icons: <MdReport size={20} />,
  },
];
export default function SideBar({setIsSidebarOpen}) {
  const pathname = usePathname();
  const isActive = (path) => path === pathname;

  return (
    <Flex
      pos={{ base: "fixed", xl: "fixed" }}
      direction= "column"
      height="100vh"
      bg={{base:'rgba(244, 247, 254, 0.1),rgba(11,20,55,0.5)',lg:'#fff'}}
      backdropFilter={{base:"saturate(180%) blur(15px)",lg:'auto'}}
      zIndex='555'
      pt={{ base: "0px", xl: "20px" }}
      px={{base:'10px',lg:"0px"}}
      // borderRadius="30px"
      alignItems="center"
      
    >
      
      <Flex alignItems={{lg:"center"}}   flexDirection={{base:'row',lg:"column"}} >

        <Text  pt={{base:'20px',md:'20px',lg:"0px" }} mb={{base:'20px'}} fontSize="20px">
          Clinic Admin
        </Text>
        <Spacer />
        <button  className={` hidden top-3 -right-1`} >
          <IoIosArrowBack size={30} />
        </button>
      </Flex>
      <Box  mt="8px" mb="auto" overflowY='auto' css={{
        '&::-webkit-scrollbar': {
          width: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'transparent',
          // backgroundColor: '#B4D4FF',

        },
        scrollbarWidth: 'thin', // For Firefox
        scrollbarColor: 'transparent transparent', // For Firefox
      }} >
        <Box marginLeft="20px" 
        // pe={{ lg: "16px", "2xl": "16px" }}
        >
          <List spacing="15px" w="100%">
            {NavLinks.map((link) => {
              return (
                <ListItem cursor="pointer"  key={link.id} py='10px' onClick={() =>setIsSidebarOpen('open')}>
                  <Link
                    href={link.path}
                    className={
                      isActive(link.path) ? "text-[blue] " : "transperent"
                    }
                  >
                    <HStack spacing="25px">
                      {link.icons}
                      <Text>{link.name}</Text>
                    </HStack>
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </Flex>
  );
}
