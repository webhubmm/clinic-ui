import { Box ,Container, Grid,GridItem,Text, Stack,Flex,Button,Divider} from "@chakra-ui/react"
import Link from 'next/link';
  import { FaPhone } from "react-icons/fa6";
  import { FaFacebookF ,FaInstagram} from "react-icons/fa";

import ButtonSecondary from "../button/ButtonSecondary";
import ButtonPrimary  from "../button/ButtonPrimary";
import ContainerBox from "../container/Container";
export default function Footer() {
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
  return (
    <Box bg="neat.tertiary" paddingY='50px'>
       {/* <Container maxW='container.xl'> */}
       <ContainerBox>
         <Box>
           <Grid templateColumns={{sm:'repeat(2, 1fr)',md:'repeat(5, 1fr)',lg:'repeat(5, 1fr)'}} gap='10'>
              <GridItem>
               <Box color='brands.logInTextColor' display='grid' gap='5'>
                <Text fontSize='lg' fontWeight='600' >
                  Navigation
                  </Text>
                  <Stack  spacing={4}>
                     {
                      navLinks.map((link,index) =>(
                        <Text key={index} _hover={{color:'neat.primary',
                        transitionDuration:'150ms'
                        }}>
                            <Link href={link.href}>
                            {link?.name}
                         </Link>
                        </Text>
                      ))
                     }
                  </Stack>

               </Box>
              </GridItem>
               <GridItem colSpan={{md:2}}>
               <Box color='brands.logInTextColor' display='grid' gap='5'>
                <Text  fontSize='lg' fontWeight='600'>

                 Working hours
                </Text>
                 <Box display='flex' gap='10'>
                    <Stack  spacing={4}>
                    <Text>
                      Monday - Friday
                    </Text>
                    <Text>
                      Saturday
                    </Text>
                    <Text>
                      Sunday
                    </Text>
                    </Stack>
                    <Stack>
                    <Text>
                      9.00 am - 6.00 pm

                    </Text>
                    <Text>
                      Closed
                    </Text>
                    <Text>
                      Closed

                    </Text>
                    </Stack>
                  </Box>
               </Box>
              </GridItem>
               <GridItem>

               <Box color='brands.logInTextColor' display='grid' gap='5'>
                <Text  fontSize='lg' fontWeight='600'>

                 Important
                </Text>
                    <Stack  spacing={4}>
                    <Text _hover={{color:'neat.primary',
                        transitionDuration:'150ms'
                        }} cursor='pointer'>
                      Terms
                    </Text>
                   <Text _hover={{color:'neat.primary',
                        transitionDuration:'150ms'
                        }} cursor='pointer'>
                      License
                    </Text>
                     <Text _hover={{color:'neat.primary',
                        transitionDuration:'150ms'
                        }} cursor='pointer'>
                    Changelog
                    </Text>
                    </Stack>
               </Box>
              </GridItem>
              <GridItem>
               <Box display='grid' gap='5'>
                <Text color='brands.logInTextColor' fontSize='lg' fontWeight='600'>

                Contact
              </Text>
                 <Box>
                       <Button
            onClick={() => {}}

      
      fontWeight='bold'
      color="brands.logInTextColor"
      size="lg"
      minW={{sm:'230px',lg:"250px"}}
        
      border='2px'
      borderColor='brands.logInBgColor'
      paddingY={{sm:'0.5rem',md:'15px'}}
      paddingX={{sm:"20px",md:"32px"}}
      borderRadius="30px"
      _hover={{bg:"brands.logInBgColor",borderColor:'brands.logInTextColor',color:"neat.secondary"
    ,
    transitionDuration: '150ms',
    transitionTimingFunction: "ease-in"
  }}
      >
        <Box display='flex'  gap='3'>
          <FaPhone />
           <Text as='span' >
            180-749-800
            </Text>
        </Box>
    </Button>
                  </Box>
                   <Box>
                      <ButtonPrimary  placeholder='Book an Appointment'>
                        
                        </ButtonPrimary>
                  </Box>

               </Box>
              </GridItem>
           </Grid>
      </Box>
      <Divider marginY='30px' color='gray'/>
      <Flex justifyContent='space-between'>
        <Text color='gray_two'>
          Copyright © Dentex. All rights reserved. Designed by Vik Studio. Powered by Webflow

          </Text>
          <Box display='flex' gap='3' color='brands.logInTextColor' alignItems='center'>
             <FaFacebookF size={20}/>
             <FaInstagram size={20}/>
          </Box>
      </Flex>
      </ContainerBox>
    </Box>
  )
}
