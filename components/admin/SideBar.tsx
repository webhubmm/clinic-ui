"use client";
import {
  Box,
  Flex,
  Text,
  List,
  ListItem,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { FaHome, FaLock } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
    icons: <FaLock size={20} />,
  },
  {
    id: 4,
    name: "Branch Managment",
    path: "/dashboard/branch",
    icons: <SiGoogleanalytics size={20} />,
  },
  {
    id: 5,
    name: "Staff Panel Features ",
    path: "/dashboard/staff",
    icons: <FaLock size={20} />,
  },
  { id: 6, name: "Packages Management", path: "/dashboard/packages", icons: <FaHome size={20} /> },
  {
    id: 7,
    name: "Doctor Management",
    path: "/dashboard/doctor",
    icons: <SiGoogleanalytics size={20} />,
  },
  {
    id: 8,
    name: "Booking Managment",
    path: "/dashboard/booking",
    icons: <FaLock size={20} />,
  },
   { id: 9, name: "Review Managment", path: "/dashboard/review", icons: <FaHome size={20} /> },
  {
    id: 10,
    name: "Expensive Tracker",
    path: "/dashboard/expensive",
    icons: <SiGoogleanalytics size={20} />,
  },
  {
    id: 11,
    name: "Report ",
    path: "/dashboard/report",
    icons: <FaLock size={20} />,
  },
];
export default function SideBar() {
  const pathname = usePathname();
  const isActive = (path) => path === pathname;

  return (
    <Flex
      pos={{ base: "static", xl: "fixed" }}
      direction={{ base: "row", xl: "column" }}
      height="100%"
      pt={{ base: "5px", xl: "20px" }}
      borderRadius="30px"
      alignItems="center"
      
    >
      <Flex alignItems="center" flexDirection="column" >
        <Text mb="20px" fontSize="20px">
          Clinic Admin
        </Text>
      </Flex>
      <Stack direction= "column" mt="8px" mb="auto" overflowY='auto' >
        <Box marginLeft="20px" pe={{ lg: "16px", "2xl": "16px" }}>
          <List spacing="15px" w="100%">
            {NavLinks.map((link) => {
              return (
                <ListItem cursor="pointer"  key={link.id}>
                  <Link
                    href={link.path}
                    className={
                      isActive(link.path) ? "text-[blue] bg-red-800" : "transperent"
                    }
                  >
                    <HStack spacing="25px" py="10px">
                      {link.icons}
                      <Text>{link.name}</Text>
                    </HStack>
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Stack>
    </Flex>
  );
}
