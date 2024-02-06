import { Box, Container, Flex, Heading ,Stack,Text} from "@chakra-ui/react";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import homeThreeImg from '@/public/assets/homeThrre.png';
import ButtonPrimary from "@/components/common/button/ButtonPrimary";
import ContainerBox from "@/components/common/container/Container";

export default function HomeOnlineServices() {
  return (
    <Box 
     bgImage= "url('../assets/asset 38.webp')"
     bgPosition="center"
    bgRepeat="no-repeat"
    >
        <ContainerBox>
       <Box display='flex' flexDir={{sm:'column-reverse',lg:'row'}} justifyContent='space-evenly' alignItems='center' height={{lg:'100vh'}}  gap='5'>
        <Box maxW={{sm:'md',lg:"lg"}} display='grid' gap={{sm:'5',lg:'10'}} alignItems='center' justifyItems='center'>
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
                    <Text as="span" color="brands.logInTextColor" fontWeight="500">
                     Stay connected with our online doctors

                    </Text>
              </Flex>

             <Flex gap="5" alignItems="center">
                    <Box color="neat.primary">
                      <FaCircleCheck size={20} />
                    </Box>
                    <Text as="span" color="brands.logInTextColor" fontWeight="500">
                     Help you achieve optimal oral health
                     </Text>
            </Flex>
              <Flex gap="5" alignItems="center">
                    <Box color="neat.primary">
                      <FaCircleCheck size={20} />
                    </Box>
                    <Text as="span" color="brands.logInTextColor" fontWeight="500">
                     We offer a comprehensive range of services
                    </Text>
               </Flex>
              
             </Stack>
               <Box>
                  <ButtonPrimary placeholder="BookAppointment">

                  </ButtonPrimary>
                </Box>  
        </Box>
         <Box position='relative' width={{sm:'80%',md:'50%'}} >
            <Image src={homeThreeImg} alt="technology image" 
            width="0"
           height="0"
           sizes="100vw"
            className="w-full h-auto"
           />
         </Box>
       </Box>
       </ContainerBox>
     {/* </Container> */}
    </Box>
  )
}
