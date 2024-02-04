import { Box,Container,Heading,Stack,Text,Flex } from "@chakra-ui/react";
import Image from "next/image";
import technologyImg from '@/public/assets/about_technol.png';
import { FaCircleCheck } from "react-icons/fa6";

export default function AboutTechnology() {
  return (
    <Box>
    <Box 
     bgImage= "url('../assets/asset 38.webp')"
     bgPosition="center"
    bgRepeat="no-repeat"
    // height='600px'
    >
        <Container maxW='container.xl'>
       <Box display='flex'  justifyContent='space-between' alignItems='center' height='100vh'>
        <Box maxW="lg"  display='grid' gap='8'>
            <Text color='neat.primary' fontWeight='600'>
                Need online support?

            </Text>
             <Heading color='brands.logInTextColor'>
                Dental technology is constantly advancing
             </Heading>
             <Text color='brands.logInTextColor' lineHeight={2} fontSize='20px'>
                Digital X-rays use significantly less radiation than traditional X-rays and provide immediate results, allowing our dental team to diagnose and treat dental issues more quickly and accurately.
             </Text>
             <Stack spacing={5}>
              <Flex gap="5" alignItems="center">
                    <Box color="neat.primary">
                      <FaCircleCheck size={20} />
                    </Box>
                    <Text as="span" color="white" fontWeight="500">
                      Digital X-rays
                    </Text>
              </Flex>

             <Flex gap="5" alignItems="center">
                    <Box color="neat.primary">
                      <FaCircleCheck size={20} />
                    </Box>
                    <Text as="span" color="white" fontWeight="500">
                      CAD/CAM technology

                    </Text>
            </Flex>
              <Flex gap="5" alignItems="center">
                    <Box color="neat.primary">
                      <FaCircleCheck size={20} />
                    </Box>
                    <Text as="span" color="white" fontWeight="500">
                      3D printing


                    </Text>
               </Flex>
                  
             </Stack>
        </Box>
         <Box>
            <Image src={technologyImg} alt="technology image" width={500} height={500}/>
         </Box>
       </Box>
     </Container>
    </Box>
    </Box>
  )
}
