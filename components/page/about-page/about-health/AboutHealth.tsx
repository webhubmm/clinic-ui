import { Box,Card,Container,Heading,Text } from "@chakra-ui/react";
import Image from "next/image";
import healthImgOne from '@/public/assets/about_health.png';
import healthImgTwo from '@/public/assets/about_health_dental.png';
import HealthCard from "./HealthCard";
import ContainerBox from "@/components/common/container/Container";
import AboutHealthCaurosel from "./AboutHealthCaurosel";


export default function AboutHealth() {
  return (
    <Box paddingTop={{sm:'5rem',md:'8rem',lg:'16rem'}} paddingBottom={{sm:'3rem',md:'7rem'}}  bg='neat.pearlwhite'>
      <Container maxW='container.xl'>
      {/* <ContainerBox> */}
       <Box display='flex' flexDir="column" gap='5'  justifyContent='center' alignItems='center'>
        <Text color='neat.primary' fontWeight='600'>
        Top priority

        </Text>
        <Heading color='neat.secondary' fontSize={{sm:'30px',md:''}}>
          Comprehensive dental care

        </Heading>
       </Box>
        
      
        <AboutHealthCaurosel />

{/* </ContainerBox> */}
       </Container>
    </Box>
  )
}
