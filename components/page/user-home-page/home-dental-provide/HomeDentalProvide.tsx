import { Box,Container,Stack,Text,Heading } from "@chakra-ui/react";
import Image from "next/image";
import homeImgTwo from '@/public/assets/homeTwo.png';
import ContainerBox from "@/components/common/container/Container";

export default function HomeDentalProvide() {
  return (
    <Box bg="neat.pearlwhite" paddingY="6rem">
      {/* <Container maxW="container.xl"> */}
      <ContainerBox>
          <Box display="flex" flexDir={{sm:'column',lg:'row'}} gap={{md:'8',lg:'0'}} alignItems="center" justifyContent="space-around">
                      <Box position="relative">
            <Image src={homeImgTwo} alt="image name" width={500} height={400} />
    
          </Box>
          <Box maxW={{md:'xl',lg:"lg"}} display="grid" gap="6">
            <Text color="neat.primary" fontWeight="600" mt={{sm:'1rem'}}>
            Our services
            </Text>

            <Heading color="neat.secondary">
              We provide dental care for you

            </Heading>
            <Text color="slate" fontSize="lg" lineHeight={2} fontWeight="600">
             At our dental practice, we offer a comprehensive range of dental services to help you achieve optimal oral health and a beautiful smile. Our team of experienced and friendly dental professionals is committed to providing care in a comfortable.
            </Text>
           
          </Box>


        </Box>
      {/* </Container> */}
      </ContainerBox>
    </Box>
  );
}
