"use client";
import React from "react";
import { Center, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavLink from "../NavLink/NavLink";

import dantxLogo from "@/public/assets/asset 6.svg";
import { navItems } from "@/constants/constants";

interface SidebarContentProps {
  onClose?: VoidFunction;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ onClose }) => {
  const pathname = usePathname();
  return (
    <>
      <Center flex="1" mb={10}>
        <Flex alignItems="center" gap={4}>
          <Image src={dantxLogo} width={70} height={35} alt="Neat Tech"></Image>
        </Flex>
      </Center>
      <Flex direction="column" rowGap={5}>
        {navItems.map((item) => (
          <NavLink key={item.title} href={item.link}>
            {item.title}
          </NavLink>
        ))}
      </Flex>
    </>
  );
};

export default SidebarContent;
