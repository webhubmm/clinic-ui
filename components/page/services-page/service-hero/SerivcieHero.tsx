
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
           <Box position='relative' width={{sm:'100%',md:'80%',lg:'60%'}} height='100%'>
            <Image src={servicesImg} alt="service hero img"   
            width="0"
           height="0"
           sizes="100vw"
            className="w-full h-auto" />
            </Box>
             <HeroCommon  title="Services" description="
             Your smile is one of your most valuable assets, and keeping it clean." placeholder="Contact Us"/>
        </Box>
      </Container>
      </Box>
    </Box>
  );
};

