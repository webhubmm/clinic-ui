import { Box, Container, Stack ,Text,Heading} from '@chakra-ui/react'
import React from 'react'
import dantxLogo from "@/public/assets/asset 6.svg";
import Image from "next/image";
import showCareImg from '@/public/assets/about_show-room.png';
import clientImg from "@/public/assets/asset 13.svg";
import dentistImg from "@/public/assets/dedicated_happy c.png";
import clincRoomsImg from "@/public/assets/clinents_rooms_happy c.png";
import musicImg from "@/public/assets/music_happy c.png";
import ShowDataCard from './ShowDataCard';
const showDataClient = [
  {
    showData:799,
    icons:clientImg,
    desc :'Happy Client'
  },
   {
    showData:13,
    icons:dentistImg,
    desc :'Dedicated dentist'
  },
   {
    showData:49,
    icons:clincRoomsImg,
    desc :'Clinic rooms'
  },
   {
    showData:622,
    icons:musicImg,
    desc :'Online support'
  },

]
export default function AboutShowCare() {
  return (
    <Box bg='brands.logInBgColor' paddingY='6rem'>
     <Container maxW='container.xl'>
      <Box position='relative'>
        <Box display='flex' gap='5' justifyContent='space-evenly'>
          <Stack maxW='md' spacing={10}>
           <Text color='neat.primary' fontWeight='600'>
             Our story
            </Text>
            <Heading color='neat.secondary'>
              Exceptional dental care services
            </Heading>
            <Text color='slate' fontSize='18px' fontWeight='600' lineHeight={2}>
              At our clinic, we believe that everyone deserves a healthy and beautiful smile. That's why we strive to provide our patients with the highest quality dental care using the latest technology and techniques. We tailor our treatments to meet your needs.
            </Text>
            <Box  display='flex' gap='3' alignItems='center'
           
            >
              <Image src={dantxLogo} alt="dantx logo" width={40} height={40} />
              <Box display='flex' gap='1'
               >
                <Text color="slate">
                  Any emergency? 
                </Text>
                <Text color='neat.secondary' fontSize='lg' fontWeight='bold'
                as='span'
                >
                  Call us: 1800-749-8000
                </Text>
              </Box>
            </Box>

        </Stack>
         <Box position='relative'>
           <Image src={showCareImg}
           alt='care dental image'
           width={600}
           height={500}
           />
         </Box>

        </Box>
     </Box>
         <Box  display="flex" justifyContent='space-between' mt='2rem'  mb='-16rem'>
          {
              showDataClient.map((data) => <ShowDataCard key={data.showData} data={data}/>)
          }
          </Box>
     </Container>
    </Box>
  )
}
