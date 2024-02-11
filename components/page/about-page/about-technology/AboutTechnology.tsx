import { Box,Container,Heading,Stack,Text,Flex } from "@chakra-ui/react";
import Image from "next/image";
import technologyImg from '@/public/assets/about_technol.png';
import { FaCircleCheck } from "react-icons/fa6";
import ContainerBox from "@/components/common/container/Container";

export default function AboutTechnology() {
  return (
    <Box 
     bgImage= "url('../assets/asset 38.webp')"
     bgPosition="center"
    bgRepeat="no-repeat"
    
    >
        <ContainerBox>
       <Box display='flex' flexDir={{sm:'column-reverse',lg:'row'}}  justifyContent={{sm:'center',lg:'space-between'}} alignItems='center' gap={{sm:'5'}} minH='100vh' paddingTop={{sm:'2rem',lg:'0px'}}>

        <Box maxW={{sm:'xl',lg:"lg"}}  display='grid' gap={{sm:'4',lg:'8'}} >
            <Text color='neat.primary' fontWeight='600'>
                Need online support?

            </Text>
             <Heading color='brands.logInTextColor' fontSize={{sm:'2rem',lg:'auto'}}>
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
                    <Text as="span" color="brands.logInTextColor" fontWeight="500">
                      Digital X-rays
                    </Text>
              </Flex>

             <Flex gap="5" alignItems="center">
                    <Box color="neat.primary">
                      <FaCircleCheck size={20} />
                    </Box>
                    <Text as="span" color="brands.logInTextColor" fontWeight="500">
                      CAD/CAM technology

                    </Text>
            </Flex>
              <Flex gap="5" alignItems="center">
                    <Box color="neat.primary">
                      <FaCircleCheck size={20} />
                    </Box>
                    <Text as="span" color="brands.logInTextColor" fontWeight="500">
                      3D printing


                    </Text>
               </Flex>
                  
             </Stack>
        </Box>

         <Box position='relative' width={{sm:'80%',md:'50%'}}>
            <Image src={technologyImg} alt="technology image"
             width="0"
           height="0"
           sizes="100vw"
            className="w-full h-auto"
            />
         </Box>
       </Box>
       </ContainerBox>
    </Box>
  )
}
