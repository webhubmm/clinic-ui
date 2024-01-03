import {
  Grid,
  GridItem,
} from "@chakra-ui/react";
import SideBar from "@/components/admin/SideBar";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Admin Dashbaord",
  description: "Admin Dashbaord for clinic",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     
     <main className=' bg-[#ffff]'>
       <Grid templateColumns="repeat(6,1fr)">
      <GridItem colSpan={{base:6,lg:2,xl:1}} bg="#ffffff" as="aside" minHeight={{lg:'100vh'}} p="30px"  >
        <SideBar />
      </GridItem>
          {children}
        </Grid>
          
    </main>
    
  );
}
