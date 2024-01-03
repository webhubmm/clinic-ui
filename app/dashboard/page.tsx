import AdminNavbar from "@/components/admin/AdminNav";
import MainDashboard from "@/components/admin/MainDashboard";
import { Box, Grid, GridItem, HStack } from "@chakra-ui/react";
export default function Dashboard() {
  return (
   
      <GridItem bg="#f4f7fe" as="main" colSpan={5} p="30px">
         <AdminNavbar />
        <Box mt="80px"  >
         <MainDashboard />
        </Box>
      </GridItem>
  
  );
}
