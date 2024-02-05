
import { Box, Center, Container, Text, Heading, Stack, Wrap } from "@chakra-ui/react";
// import AboutImg from "@/public/assets/about_hero im.png";
import servicesImg from '@/public/assets/servicesHero.png';
import Image from "next/image";
import HeroCommon from "@/components/common/commonHero/HeroCommon";
export default function ServicesHero() {
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
            <Image src={servicesImg} alt="hero img" objectFit="cover" width={600} height={400} sizes='50vw' />
            </Box>
             <HeroCommon  title="Services" description="
             Your smile is one of your most valuable assets, and keeping it clean." placeholder="Contact Us"/>
        </Box>
      </Container>
      </Box>
    </Box>
  );
};

