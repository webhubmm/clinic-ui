import { Box, Container, Heading, Stack,Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import aboutActionImg from "@/public/assets/aboutshow_for you.png";
import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import ContainerBox from "@/components/common/container/Container";

export default function AboutShowAction() {
  return (
     <Box bg='brands.logInBgColor' paddingY='6rem'>
     <ContainerBox>
      
      <Box >  
        <Box display='flex' flexDir={{sm:'column-reverse',lg:'row'}} gap='5' justifyContent='space-between' alignItems={{sm:"center",lg:'start'}}>
          <Stack maxW={{sm:'md',md:'lg'}} spacing={12}>
            <Box display='grid' gap='3'> 
                <Text color='neat.primary' fontWeight='600'>
           Healthy teeth and gums

            </Text>
            <Heading color='neat.secondary'>
              For your dental health

            </Heading>
            </Box>
            <Text color='slate' fontSize='18px' fontWeight='600' lineHeight={2}>
              At our clinic, we believe that everyone deserves a healthy and beautiful smile. That's why we strive to provide our patients with the highest quality dental care using the latest technology and techniques. We tailor our treatments to meet your needs.
            </Text>
            <Box>
                <ButtonPrimary placeholder="Book an appontment">

                </ButtonPrimary>
            </Box>
            

        </Stack>
         <Box position='relative'>
           <Image src={aboutActionImg}
           alt='care dental image'
           width={500}
           height={400}
           />
         </Box>

        </Box>
     </Box>
        </ContainerBox>
    </Box>
  )
}
