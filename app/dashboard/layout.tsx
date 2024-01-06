import {
  Grid,
  GridItem,
} from "@chakra-ui/react";
import SideBar from "@/components/admin/SideBar";
import AdminNavbar from "@/components/admin/AdminNav";

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
    <main className=" bg-[#ffff]">
      <Grid templateColumns="repeat(6,1fr)">
        <GridItem
          colSpan={{ base: 6, lg: 2, xl: 1 }}
          bg="#ffffff"
          as="aside"
          minHeight={{ lg: "100vh" }}
          
        >
          <SideBar />
        </GridItem>
        <GridItem bg="#f4f7fe" colSpan={5} p="20px">
          <AdminNavbar />

          {children}
        </GridItem>
      </Grid>
    </main>
  );
}
