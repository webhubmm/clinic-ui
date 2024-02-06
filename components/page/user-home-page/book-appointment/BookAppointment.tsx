  import { FaPhone } from "react-icons/fa6";
  import provideDentalCareImg from "@/public/assets/asset 8.webp";
  import {
    FormControl,
    FormHelperText,
    FormLabel,
  } from "@chakra-ui/form-control";
  import { Input } from "@chakra-ui/input";
  import { Select } from "@chakra-ui/select";
  import { Textarea } from "@chakra-ui/textarea";
  import { Checkbox } from "@chakra-ui/checkbox";
  import ButtonPrimary from "@/components/common/button/ButtonPrimary";
  import { Box, Card, Circle, Container, Heading, Stack, Text, VStack } from "@chakra-ui/react";
  import ButtonSecondary from "@/components/common/button/ButtonSecondary";
  import Image from "next/image";
import FormCommon from "@/components/common/form/FormCommon";
import ContainerBox from "@/components/common/container/Container";

  const BookAppointment = () => {
    return (
      <Box color="neat.pearlwhite" paddingY='50px' position='relative'>
        {/* <Container maxW='container.xl'> */}
        <ContainerBox>
          <Box  display='flex' flexDir={{sm:'column',lg:'row'}} justifyContent={{sm:'center',lg:'space-between'}} gap='10' alignItems={{sm:'center',lg:'space-between'}}
          >
            <Box
            flex='1'
            
            >
              <Box position={{lg:'absolute'}} maxW={{sm:'sm',lg:'auto'}} zIndex={20} top='-12'>
<Card bg="neat.primary" paddingX='30px' paddingY='15px' >
                <Box 
                display="flex" alignItems='start'
                gap='5'
                >
                  <Circle 
                  bg="brands.logInTextColor"
                  color='neat.primary'
                  padding='16px'
                  >
                    <FaPhone size="20" />
                  </Circle>
                  <VStack 
                  spacing={2}
                  color='brands.logInTextColor'
                  fontWeight='700'
                  
                  >
                    <Text>Call us for emergency</Text>
                    <Text>1800-749-8000</Text>
                  </VStack>
                </Box>
              </Card>
              </Box>

              

              <Card padding={{sm:'30px',md:'40px'}} borderRadius='15px' boxShadow='md' marginTop='80px' maxW='xl'>
                <Box 
                className="space-y-8"
                >
                  <Text 
                  color="neat.primary"
                  >What we do</Text>
                  <Box 
                  color='neat.secondary'
                  width={{sm:'100%',md:'80%'}}
                  >
                    <Heading marginY='20px'>Provide genuine dental care</Heading>
                  </Box>
                  <Box 
                  display='flex' flexDir={{sm:'column-reverse',lg:'row'}} gap='3'
                  >
                    <Stack 
                    spacing={20}
                    maxW={{lg:'220px'}}
                    >
                      <Text 
                      color="slate"
                      lineHeight={2}
                      fontWeight={600}
                      >
                        We offer a comprehensive range of dental services to help
                        you achieve optimal oral health and a beautiful smile. Our
                        team of experienced.
                      </Text>
                      <Box>
                        <ButtonSecondary bg='neat.secondary' placeholder="Learn more"></ButtonSecondary>
                      </Box>
                    </Stack>
                    
                    <Image
                      src={provideDentalCareImg}
                      className=" object-contain"
                      alt="providing dental care image"
                      width={400}
                      height={400}
                    />
                  </Box>
                </Box>
              </Card>
            </Box>
            <Box 
            maxW='xl'
            flex='1'
            marginTop={{lg:'-150px'}}
            zIndex={30}
            >
              
              <Card padding={{sm:'30px',lg:'40px'}} borderRadius="15px">
                <FormCommon />
                
              </Card>
            </Box>
          </Box>
          </ContainerBox>
        {/* </Container> */}
      </Box>
    );
  };

  export default BookAppointment;
