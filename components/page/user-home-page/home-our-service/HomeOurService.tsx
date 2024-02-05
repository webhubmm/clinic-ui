import { Box, Container, Heading, Text ,Flex} from "@chakra-ui/react";
import Image from "next/image";
import homeServiceImg from '@/public/assets/homeOurServices.png';
import ButtonSecondary from "@/components/common/button/ButtonSecondary";
import { FaCircleCheck } from "react-icons/fa6";

export default function HomeOurService() {
  return (
    <Box paddingY='8rem' bg='white'>
        <Container maxW='container.xl'>
        <Box display='flex' alignItems="center" justifyContent='space-around'>
            <Image src={homeServiceImg} alt="our services page " width={500} height={500}/>
            <Box display='grid' gap='8'>
                <Text color='neat.primary' fontWeight={600}>
                    Our priority

                </Text>
                <Heading color='neat.secondary'>
                    Why choose our service?

                </Heading>
                <Text color='slate' fontSize='18px' lineHeight={2} maxW='md'>
                    We offer a wide range of dental services, including preventative care, restorative treatments, cosmetic procedures, and emergency services.
                </Text>
                <Box display='grid' gap='5'>
            <Flex gap='5'>
              <Box color='neat.primary'>
              <FaCircleCheck  size={20}/>

              </Box>
              <Text as ='span' color='neat.secondary'>
                 Stay connected with our online doctors

              </Text>
              
            </Flex>
             <Flex gap='5'>
              <Box color='neat.primary'>
              <FaCircleCheck  size={20}/>

              </Box>
              <Text as ='span' color='neat.secondary'>
                 Stay connected with our online doctors

              </Text>
              
            </Flex>
             <Flex gap='5'>
              <Box color='neat.primary'>
              <FaCircleCheck  size={20}/>

              </Box>
              <Text as ='span' color='neat.secondary'>
                 Stay connected with our online doctors

              </Text>
              
            </Flex>
    </Box>
                <Box>
                    <ButtonSecondary placeholder="Book an apponintment">

                        </ButtonSecondary>
                </Box>
            </Box>
        </Box>
        </Container>
    </Box>
  )
}
