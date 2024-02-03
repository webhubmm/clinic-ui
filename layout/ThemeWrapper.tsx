"use client";

import { Box, useBreakpointValue } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { getAuth, getToken } from "../lib/auth";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Sidebar/Navbar";
import { getAuth, getToken } from "@/lib/auth";
const smVariant = { navigation: "drawer", navigationButton: true };
const mdVariant = { navigation: "sidebar", navigationButton: false };

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = getToken();
  const avaliablePath =
    pathname.includes("/dashboard") || pathname.includes("/userManagement");
  const checkingPathAndNavigationButton =
    avaliablePath && !variants?.navigationButton;

  useEffect(() => {
    const checkAuth = getAuth();
    const accessToken = getToken();
    if (checkAuth === null || accessToken === undefined) {
      router.push("/login");
    } else if (pathname === "/login" && checkAuth !== null) {
      const userRole = checkAuth.data.user.role;
      if (userRole === "admin") router.push("/dashboard");
      else if (userRole === "staff") router.push("/dashboard/staff");
      else if (userRole === "user") router.push("/");
      else router.push("/");
    }
  }, [pathname]);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  return (
    <>
      <Box>
        <Sidebar
          variant={(variants?.navigation as "drawer") || "sidebar"}
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
        />

        <Box ml={checkingPathAndNavigationButton ? 250 : 0}>
          <Navbar
            showSidebarButton={variants?.navigationButton}
            onShowSidebar={toggleSidebar}
          />

          <Box
            p={{ base: 2, md: 5 }}
            ml={checkingPathAndNavigationButton ? 0 : 0}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ThemeWrapper;
