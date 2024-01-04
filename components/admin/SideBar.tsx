  import { Box,Flex, Text,List ,ListItem, HStack ,Stack} from "@chakra-ui/react";
  import Link from 'next/link';
  export default function SideBar() {
    return (
      <Flex pos='fixed' direction='column' height='100%' pt='25px' borderRadius='30px'>
        <Flex alignItems='center' flexDirection='column'  >
          <Text mb='20px'>Clinic Admin</Text>
        </Flex>
        <Stack direction='column' mt='8px' mb='auto'>
<Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }}>
            <List spacing="10px">
          <ListItem cursor="pointer">
            <Link href="/dashboard">
              <HStack>

                <Text>Home</Text>
              </HStack>
            </Link>
          </ListItem>
          <ListItem cursor="pointer">
            <Link href="/dashboard/table">
          <HStack>
                
                <Text>Data Tables</Text>
              </HStack>
            </Link>
          </ListItem>
          <ListItem cursor="pointer">
            <Link href="/dashboard/usermanagment">
                <HStack>
                
                <Text>usermanagment</Text>
              </HStack>
            </Link>
          </ListItem>
        </List>
</Box>
        </Stack>
      </Flex>
    );
  }
