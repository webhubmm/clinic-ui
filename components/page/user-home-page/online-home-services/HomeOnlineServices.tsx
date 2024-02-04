import { Box, Container, Flex, Heading ,Stack,Text} from "@chakra-ui/react";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import homeThreeImg from '@/public/assets/homeThrre.png';
import ButtonPrimary from "@/components/common/button/ButtonPrimary";
export default function HomeOnlineServices() {
  return (
     <Box>
    <Box 
     bgImage= "url('../assets/asset 38.webp')"
     bgPosition="center"
    bgRepeat="no-repeat"
    // height='600px'
    >
        <Container maxW='container.xl'>
       <Box display='flex'  justifyContent='space-evenly' alignItems='center' height='120vh' >
        <Box maxW="lg"  display='grid' gap='10'>
            <Text color='brands.logInTextColor' fontWeight='600'>
                Need online support?

            </Text>
             <Heading color='brands.logInTextColor'>
               Your fingertips with our online services

             </Heading>
            
             <Stack spacing={5}>
              <Flex gap="5" alignItems="center">
                    <Box color="neat.primary">
                      <FaCircleCheck size={20} />
                    </Box>
                    <Text as="span" color="white" fontWeight="500">
                     Stay connected with our online doctors

                    </Text>
              </Flex>

             <Flex gap="5" alignItems="center">
                    <Box color="neat.primary">
                      <FaCircleCheck size={20} />
                    </Box>
                    <Text as="span" color="white" fontWeight="500">
                     Help you achieve optimal oral health
                     </Text>
            </Flex>
              <Flex gap="5" alignItems="center">
                    <Box color="neat.primary">
                      <FaCircleCheck size={20} />
                    </Box>
                    <Text as="span" color="white" fontWeight="500">
                     We offer a comprehensive range of services
                    </Text>
               </Flex>
              
             </Stack>
               <Box>
                  <ButtonPrimary placeholder="BookAppointment">

                  </ButtonPrimary>
                </Box>  
        </Box>
         <Box position='relative'>
            <Image src={homeThreeImg} alt="technology image" width={500} height={500}/>
         </Box>
       </Box>
     </Container>
    </Box>
    </Box>
  )
}
