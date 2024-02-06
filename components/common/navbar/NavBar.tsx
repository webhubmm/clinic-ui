"use client";
import { Box,Text ,List,ListItem,Circle} from "@chakra-ui/react";
import Image from "next/image";
import dantxLogo from "@/public/assets/asset 6.svg";
import { usePathname } from "next/navigation";
import ButtonPrimary from "../button/ButtonPrimary";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import ContainerBox from "../container/Container";

export default function UserNavBar() {
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
    <Box bg='brands.logInTextColor' position={{sm:'sticky',lg:'static'}} top='0' zIndex={60} boxShadow="sm">
       {/* <Container maxW={{sm:'container.sm',md:'container.md',xl:'container.xl',lg:'container.xl'}} > */}
       <ContainerBox>
         <Box paddingY={{sm:"18px",lg:"28px"}}  >
        <Box display='flex' alignItems="center"  justifyContent='space-between'  >

  <Box  display='flex'alignItems='center' gap='3'>
          <Image src={dantxLogo} alt="Dentex Logo" width={30} height={30} />
         <Text color='neat.secondary' fontSize='25px' fontWeight='bold'>
            Dentex
         </Text>
       </Box>
        
       
             <Box display={{sm:'none',xl:'inline-block'}}>
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
             <Box display={{sm:'none',xl:'flex'}} gap='8' alignItems='center'>
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
             <Box display={{sm:'block',lg:'none'}}>
                  <CiMenuFries size={25}/>
             </Box> 
    </Box>
     
        
        </Box>
    </ContainerBox>
  </Box>
  )
}
