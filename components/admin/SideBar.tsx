  import { Box, Text,List ,ListItem } from "@chakra-ui/react";
  import Link from 'next/link';
  export default function SideBar() {
    return (
      <Box>
        <Text pb="10px">Clinic Admin</Text>
        <List spacing="10px">
          <ListItem cursor="pointer">
            <Link href="/dashboard">Home</Link>
          </ListItem>
          <ListItem cursor="pointer">
            <Link href="/dashboard/table">Data Tabel</Link>
          </ListItem>
          <ListItem cursor="pointer">
            <Link href="/dashboard/usermanagment">userManagment</Link>
          </ListItem>
        </List>
      </Box>
    );
  }
