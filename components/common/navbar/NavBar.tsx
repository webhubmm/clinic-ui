"use client";
import { Box, Container,Text ,List,ListItem,Circle} from "@chakra-ui/react";
import Image from "next/image";
import dantxLogo from "@/public/assets/asset 6.svg";
import { usePathname } from "next/navigation";
import ButtonPrimary from "../button/ButtonPrimary";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";


export default function NavBar() {
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
   const pathName = usePathname();

  const activeLink = (url: string, pathname: string) =>
    pathname === url ? "neat.primary" : "neat.secondary";

  return (
    <Box bg='brands.logInTextColor'>
       <Container maxW='container.xl' >
        <Box display='flex' alignItems="center"  justifyContent='space-between' height={28}>

       <Box  display="flex" gap='3' alignItems='center'>
          <Image src={dantxLogo} alt="Dentex Logo" width={30} height={30} />
         <Text color='neat.secondary' fontSize='25px' fontWeight='bold'>
            Dentex
         </Text>
       </Box>
        
       
             <Box>
              <List  display="flex" alignItems='center' justifyContent='space-around' gap='20' fontSize='lg' fontWeight='600' >
                 {
                   navLinks?.map((link,index) =>(
                       <ListItem key={index} cursor="pointer"  color={`${activeLink(link.href,pathName)}`}>
                         <Link href={link.href}>
                            {link?.name}
                         </Link>
                       </ListItem>
                   )) 
                 }
                

                </List>
             </Box>
             <Box display='flex' gap='8' alignItems='center'>
                <Box display='flex' gap='3' alignItems='center'> 
              <Circle size='35px' bg='neat.primary' color='white'>
                <FaPhoneAlt />
             </Circle>
                    <Text color="neat.secondary" fontSize="20px" fontWeight='600'>
                    
                    1800-749-8000
                </Text>

                </Box>
            <Link href={"/login"}>
              <ButtonPrimary
                placeholder="Sign In"
                onClick={() => {}}
              ></ButtonPrimary>
            </Link>
             </Box>
        
        </Box>
    </Container>
  </Box>
  )
}
