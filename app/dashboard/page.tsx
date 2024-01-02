import AdminNav from "@/components/admin/AdminNav";
import SideBar from "@/components/admin/SideBar";
import { Box, Grid, GridItem, HStack } from "@chakra-ui/react";
export default function Dashboard() {
  return (
    <Grid templateColumns="repeat(6,1fr)">
      <GridItem colSpan={1} bg="#ffffff" as="aside" minHeight="100vh" p="30px">
        <SideBar />
      </GridItem>
      <GridItem bg="#a3aed0" as="main" colSpan={5} p="30px">
          <AdminNav />
        <Box m="2px" bg="white">
          Dashboard Page
        </Box>
      </GridItem>
    </Grid>
  );
}
