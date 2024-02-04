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
  const BookAppointment = () => {
    return (
      <Box color="neat.pearlwhite" paddingY='50px' position='relative'>
        <Container maxW='container.xl'>
          <Box  display='flex' justifyContent='space-between' gap='10'
          >
            <Box
            flex='1' 
            
            >
              <Card bg="neat.primary" paddingX='30px' paddingY='15px' position='absolute' zIndex={20} top='-12'>
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
                  // className="text-white space-y-2"
                  >
                    <Text>Call us for emergency</Text>
                    <Text>1800-749-8000</Text>
                  </VStack>
                </Box>
              </Card>

              <Card padding='40px' borderRadius='15px' boxShadow='md' marginTop='80px' maxW='xl'>
                <Box 
                // display='grid'
                className="space-y-8"
                >
                  <Text 
                  color="neat.primary"
                  >What we do</Text>
                  <Box 
                  color='neat.secondary'
                  width='80%'
                  >
                    <Heading marginY='20px'>Provide genuine dental care</Heading>
                  </Box>
                  <Box 
                  display='flex' gap='3'
                  >
                    <Stack 
                    spacing={20}
                    maxW='220px'
                    >
                      <Text 
                      color="gray"
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
            marginTop='-150px'
            zIndex={30}
            // position='absolute'  top={-15} right="20"
            >
              <Card padding='40px' borderRadius="15px">
                <Box display='grid' gap='5'
                >
                  <Box 
                  color='neat.secondary'
                  >
                    <Heading>Book an appointment</Heading>
                  </Box>
                  <Text 
                  color="neat.secondary"
                  >
                    Get your dental health back on track with us
                  </Text>
                  <form action="" 
                  // className="space-y-5"
                  >
                  <Box color='gray' display='grid' gap='5'>
                    <Box 
                    display="flex" justifyContent='space-between'
                    gap='10'
                    >
                      <Box>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="First Name"
                            padding={8}
                          />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Last Name"
                            padding={8}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                    <Box>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email Address"
                          padding={8}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <Input type="tel" placeholder="Phone" padding={8} />
                      </FormControl>
                    </Box>
                    <Box 
                    display='flex'
                    // className="flex"
                    >
                      <Box 
                      flex='1'
                      // className="flex-1"
                      >
                        <FormControl>
                          <Input type="date" placeholder="Date" paddingY='32px'/>
                        </FormControl>
                      </Box>
                    </Box>
                    <Box 
                    marginBottom='40px'
                    // className="mb-10"
                    >
                      <FormControl>
                        <Textarea placeholder="Message" cols={5} rows={6} />
                      </FormControl>
                    </Box>
                    <Box 
                    display="flex"
                    alignContent='center'
                    justifyContent='space-between'
                    >
                      <Checkbox colorScheme="gray">Email subscribe</Checkbox>
                      <ButtonPrimary placeholder="Book Now"></ButtonPrimary>
                    </Box>
                    </Box> 
                  </form>
                </Box>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  };

  export default BookAppointment;
