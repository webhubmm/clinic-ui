    'use client';
    import { Box,Flex, Text,List ,ListItem, HStack ,Stack} from "@chakra-ui/react";
    import { FaHome ,FaLock} from "react-icons/fa";
  import { SiGoogleanalytics } from "react-icons/si";
import { usePathname } from 'next/navigation'
import Link from 'next/link';

const NavLinks = [
    { id: 1, name: 'Home', path: '/dashboard' ,icons:<FaHome  size={20}/>},
    { id: 2, name: 'Data Tables', path: '/dashboard/table',icons:<SiGoogleanalytics  size={20}/> },
    { id: 3, name: 'SignIn', path: '/signin' ,icons:<FaLock  size={20}/>},
];
    export default function SideBar() {
      const pathname =usePathname();
    const isActive = (path) => path === pathname;

      return (
        <Flex pos={{base:'static',xl:"fixed"}} direction={{base:'row','xl':'column'}} height='100%'  pt={{base:"5px" ,xl:'20px'}} borderRadius='30px' alignItems='center' >
          <Flex alignItems='center' flexDirection='column' >
            <Text mb='20px' fontSize='20px' >Clinic Admin</Text>
          </Flex>
          <Stack direction={{base:'row',xl:'column'}} mt='8px' mb='auto'>
          <Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }}>
              <List spacing="15px" w='100%' >
                {
                  NavLinks.map(link =>{
                    return (
 <ListItem cursor="pointer" py='10px' key={link.id} >
              <Link href={link.path} className={isActive(link.path) ? 'text-[hotpink]' : 'transperent'}>
                <HStack spacing='25px'  >
                  {link.icons}
                  <Text>{link.name}</Text>
                </HStack>
              </Link>
            </ListItem>
                    )
                  })
                }
           
          
          </List>
  </Box>
          </Stack>
        </Flex>
      );
    }
