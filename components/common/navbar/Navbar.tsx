"use client";

import Image from "next/image";
import React from "react";
import dantxLogo from "@/public/assets/asset 6.svg";
import Link from "next/link";
import Text from "../text/Text";
import { useRouter } from "next/navigation";
import ButtonPrimary from "../button/ButtonPrimary";

const NavBar = () => {
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

  const router = useRouter();

  const activeLink = (url: string, pathname: string) =>
    pathname === url ? "text-neat-primary" : "";

  return (
    <nav className="bg-white">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 py-14">
        <div className="flex gap-3">
          <Image src={dantxLogo} alt="Dentex Logo" width={30} height={30} />
          <Text color="text-neat-secondary">Dentex</Text>
        </div>
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <Text color="text-neat-secondary">{link.name}</Text>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-8">
            <Text color="text-neat-primary">1800-749-8000</Text>
            <ButtonPrimary
              placeholder="Book an appointment"
              onClick={() => {}}></ButtonPrimary>
          </div>
          <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
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
