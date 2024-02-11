"use client";

import { Box, Center, Container, Text, Heading, Stack, Wrap } from "@chakra-ui/react";
import HeroImg from "@/public/assets/contactForm.png";
import Image from "next/image";
import dantxLogo from "@/public/assets/asset 6.svg";
import ButtonPrimary from "@/components/common/button/ButtonPrimary";
export default function Hero() {
  return (
    <Box  overflow='hidden'>

    <Box 
     bgImage= "url('../assets/asset 37.webp')"
     bgPosition="center"
    bgRepeat="no-repeat"
  
    >
      <Container maxW='container.xl'>
        <Box 
        display='flex'
        flexDir={{sm:'column-reverse',lg:'row'}}
        justifyContent={{sm:'center',lg:'space-around'}}
        gap={{sm:'5',lg:'10'}}
        alignItems="center"
        >
          <Box position='relative' width={{sm:'80%',md:'40%',lg:'50%'}} height='100%' >
            <Image src={HeroImg} alt="hero img" 
             width="0"
             height="0"
             sizes="100vw"
            className="w-full h-auto"
            />
            </Box>
          <Box  marginTop={{sm:'2rem',lg:'0px'}} display='grid' gap='5' 
          >
            <Stack direction='column' spacing='20px'  color='brands.logInTextColor'  maxW={{md:'md',lg:'xl'}}
            >
              <Heading fontSize={{sm:"45px",md:'60px'}} fontWeight='bold'  >Trustworthy dental services</Heading>
              <Text fontSize={{sm:'18px',md:'20px'}} fontWeight='500' lineHeight={2} >
                Our dental clinic offers a range of services to help you achieve
                a healthy and beautiful smile.
              </Text>
               <Box>
                <ButtonPrimary placeholder="Learn More" onClick={() => {}} />
                </Box>
            </Stack>
            <Box  display='flex' gap='5' alignItems='center'
           
            >
             <Box>
                <Image src={dantxLogo} alt="dantx logo" width={40} height={40} />
              </Box>
              <Box display={{md:'flex'}} gap={{md:'1'}}
               >
                <Text color="neat.primary">Say goodbye</Text>
                <Text color='brands.logInTextColor'
                // as='span'
                >
                  to dental issues with our restoration services.
                </Text>
              </Box>
            </Box>
            
          </Box>
        </Box>
      </Container>
      </Box>
   </Box>
  );
};

