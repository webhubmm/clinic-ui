"use client";

import Image from "next/image";
import React, { useState } from "react";
import dantxLogo from "@/public/assets/asset 6.svg";
import Link from "next/link";
import Text from "../text/Text";
import { usePathname } from "next/navigation";
import ButtonPrimary from "../button/ButtonPrimary";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const btnRef = React.useRef();

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "AboutUs",
      href: "/about",
    },
    {
      name: "Services",
      href: "/services",
    },
    {
      name: "Blogs",
      href: "/blogs",
    },
    {
      name: "ContactUs",
      href: "/contact",
    },
  ];

  const pathName = usePathname();

  const activeLink = (url: string, pathname: string) =>
    pathname === url ? "text-neat-primary" : "text-neat-secondary";

  return (
    <nav className="bg-white">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 py-8 lg:py-14 px-6 lg:px-0">
        <div className="flex gap-3">
          <Image src={dantxLogo} alt="Dentex Logo" width={30} height={30} />
          <Text color="text-neat-secondary">Dentex</Text>
        </div>
        <div className="flex flex-1 items-center justify-end lg:justify-between">
          <nav aria-label="Global" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <Text color={`${activeLink(link.href, pathName)}`}>
                      {link.name}
                    </Text>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="items-center gap-8 hidden lg:flex">
            <Text color="text-neat-primary">1800-749-8000</Text>
            <ButtonPrimary
              placeholder="Book an appointment"
              onClick={() => {}}></ButtonPrimary>
          </div>
          <button
            onClick={() => setNav((prev) => !prev)}
            className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 lg:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
