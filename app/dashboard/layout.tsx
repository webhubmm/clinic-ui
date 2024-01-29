'use client';

import {
  Grid,
  GridItem,
} from "@chakra-ui/react";
import SideBar from "@/components/admin/sidebar/SideBar";
import AdminNavbar from "@/components/admin/AdminNav";
import type { Metadata } from "next";
import { useState } from "react";
// export const metadata: Metadata = {
//   title: "Admin Dashbaord",
//   description: "Admin Dashbaord for clinic",
// };
import { IoIosArrowBack } from "react-icons/io";
import { RiMenu3Fill } from "react-icons/ri";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState<string>('open');

const handleSidebarToggle = () => {
  setIsSidebarOpen((prev) => (prev === 'open' ? 'close' : 'open'));
};
  return (
    <main className=" bg-[#f4f7fe]" >
      <button
        className={`fixed top-7 z-[999] lg:hidden ${
          isSidebarOpen === 'open' ? 'left-6  top-4' : 'top-[18px] sm:top-[15px] left-5'
        }`}
        onClick={handleSidebarToggle}
      >
        {isSidebarOpen !== 'open' ? (
          <IoIosArrowBack size={30} />
        ) : (
          <RiMenu3Fill size={30} />
        )}
      </button>
    
      <Grid templateColumns="repeat(6,1fr)">
       {isSidebarOpen ==='open' ? (
        <GridItem
          colSpan={{lg: 1, xl: 1 }}
          bg="#ffffff"
          as="aside"
          display={{base:'none',md: 'none',lg:'block'}}
          minHeight={{lg:"100vh"}}
        >
          <SideBar setIsSidebarOpen={setIsSidebarOpen}/>
        </GridItem>
      ) : (
        
        <GridItem
          colSpan={{base:3,lg:0 }}
          bg="#ffffff"
          as="aside"
          display={{base:'block',md: 'block',lg:'none'}}
          minHeight={{base:'100hv',lg:"100vh"}}
        >
          <SideBar setIsSidebarOpen={setIsSidebarOpen}/>
        </GridItem>
      
      )}
        <GridItem colSpan={{base:6,xl:5}}  px={{base:'20px',lg:'28px'}}>
          <AdminNavbar />

          {children}
        </GridItem>
      </Grid>
    </main>
  );
}
