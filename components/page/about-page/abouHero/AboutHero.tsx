"use client";

import { Box, Center, Container, Text, Heading, Stack, Wrap } from "@chakra-ui/react";
import AboutImg from "@/public/assets/about_hero im.png";
import Image from "next/image";
import HeroCommon from "@/components/common/commonHero/HeroCommon";
export default function AboutHero() {
  return (
      <Box overflow='hidden'>

    <Box 
     bgImage= "url('../assets/asset 37.webp')"
     bgPosition="center"
    bgRepeat="no-repeat"
   
    >
      <Container maxW='container.xl'>
        <Box 
        display='flex'
        flexDir={{sm:'column-reverse',lg:'row'}}
        justifyContent='center'
        gap='10'
        alignItems="center"
       
        >
          <Box position='relative' >
            <Image src={AboutImg} alt="hero img" objectFit="cover" width={600} height={400} sizes='50vw' />
            </Box>
             <HeroCommon  title="About Us" description="
             Our dental team has years of experience and is dedicated to providing dental care.

" placeholder="Contact Us"/>
        </Box>
      </Container>
      </Box>
    </Box>
  );
};

