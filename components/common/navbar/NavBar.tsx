"use client";
import { Box, Text, List, ListItem, Circle } from "@chakra-ui/react";
import {
  Fade,
  ScaleFade,
  Slide,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react";
import Image from "next/image";
import dantxLogo from "@/public/assets/asset 6.svg";
import { usePathname } from "next/navigation";
import ButtonPrimary from "../button/ButtonPrimary";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import ContainerBox from "../container/Container";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

export default function UserNavBar() {
  const [isRes, setIsRes] = useState(false);
  const handleRes = () => {
    setIsRes((prev) => !prev);
  };
  const closeNavbar = () => {
    // Toggle the visibility of the navbar
    setIsRes(false);
  };

  const navLinks = [
    {
      name: "Home",
      href: "/",
      isOpen: false,
    },
    {
      name: "AboutUs",
      href: "/about",
      isOpen: false,
    },
    {
      name: "Services",
      href: "/services",
      isOpen: false,
    },
    {
      name: "Blogs",
      href: "/blogs",
      isOpen: false,
    },
    {
      name: "ContactUs",
      href: "/contact",
      isOpen: false,
    },
  ];
  const pathName = usePathname();

  const activeLink = (url: string, pathname: string) =>
    pathname === url ? "neat.primary" : "neat.secondary";

  return (
    <Box
      bg="brands.logInTextColor"
      position={{ sm: "sticky", lg: "static" }}
      top="0"
      left="0"
      zIndex={60}
      boxShadow="sm"
    >
      <ContainerBox>
        <Box paddingY={{ sm: "18px", lg: "28px" }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              display={{ sm: "none", lg: "flex" }}
              alignItems="center"
              gap="3"
            >
              <Image src={dantxLogo} alt="Dentex Logo" width={30} height={30} />
              <Text color="neat.secondary" fontSize="25px" fontWeight="bold">
                Dentex
              </Text>
            </Box>

            <Box display={{ sm: "none", xl: "inline-block" }}>
              <List
                display="flex"
                alignItems="center"
                justifyContent="space-around"
                gap="20"
                fontSize="lg"
                fontWeight="600"
              >
                {navLinks?.map((link, index) => (
                  <ListItem
                    key={index}
                    cursor="pointer"
                    color={`${activeLink(link.href, pathName)}`}
                  >
                    <Link href={link.href}>{link?.name}</Link>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box
              display={{ sm: "none", xl: "flex" }}
              gap="8"
              alignItems="center"
            >
              <Box display="flex" gap="3" alignItems="center">
                <Circle size="35px" bg="neat.primary" color="white">
                  <FaPhoneAlt />
                </Circle>
                <Text color="neat.secondary" fontSize="20px" fontWeight="600">
                  1800-749-8000
                </Text>
              </Box>
              <Link href={"/login"}>
                <ButtonPrimary
                  placeholder="Sign In"
                  onClick={() => {}}
                ></ButtonPrimary>
              </Link>
            </Box>
          </Box>

          {/* for responsive */}
          <Box
            display={{ sm: "flex", lg: "none" }}
            zIndex={100}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center" gap="3">
              <Image src={dantxLogo} alt="Dentex Logo" width={30} height={30} />
              <Text color="neat.secondary" fontSize="25px" fontWeight="bold">
                Dentex
              </Text>
            </Box>

            {/* toggle */}
            <Box as="button" onClick={handleRes} zIndex="100">
              {isRes ? <RxCross2 size={25} /> : <CiMenuFries size={25} />}
            </Box>
          </Box>
          {isRes && (
            <Box
              display={{ sm: "flex", lg: "none" }}
              flexDir="column-reverse"
              pl="20px"
              justifyContent="space-evenly"
              position="fixed"
              top="0"
              left="20%"
              width="100%"
              height="100vh"
              bg="white"
              zIndex={80}
              // transition={{ exit: { delay: 1 }, enter: { duration: 0.6 } }}
            >
              <Box
                display="flex"
                flexDir="column"
                gap="3"
                justifyContent="space-around"
              >
                <List
                  display="grid"
                  alignItems="center"
                  gap="6"
                  fontSize="lg"
                  fontWeight="600"
                >
                  {navLinks?.map((link, index) => (
                    <ListItem
                      key={index}
                      cursor="pointer"
                      color={`${activeLink(link.href, pathName)}`}
                    >
                      <Link href={link.href} onClick={closeNavbar}>
                        {link?.name}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box display="grid" gap="8" alignItems="center">
                <Box display="flex" gap="3" alignItems="center">
                  <Circle size="35px" bg="neat.primary" color="white">
                    <FaPhoneAlt />
                  </Circle>
                  <Text color="neat.secondary" fontSize="16px" fontWeight="600">
                    1800-749-8000
                  </Text>
                </Box>
                <Link href={"/login"}>
                  <ButtonPrimary
                    placeholder="Sign In"
                    onClick={() => {}}
                  ></ButtonPrimary>
                </Link>
              </Box>
            </Box>
          )}
        </Box>
      </ContainerBox>
    </Box>
  );
}
