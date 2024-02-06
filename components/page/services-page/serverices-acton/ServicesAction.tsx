import { Box, Container, VStack,Stack ,Text,Heading, Circle, Card, Divider,Flex} from '@chakra-ui/react'
import serviceImg from '@/public/assets/service_action_service.png';
import Image from 'next/image';
  import { FaPhone } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import ContainerBox from '@/components/common/container/Container';

const lists = [
  {
    id:80,
    title:'Quality Care'
  },
  {
    id:90,
    title:'Experienced Team'
  },
  {
    id:60,
    title:'Comprehensive Services'
  },
  {
    id:50,
    title:'Commitment to Excellence'
  }
]
export default function ServicesAction() {
  return (
    <Box bg='brands.logInBgColor' paddingY='6rem'>
         {/* <Container maxW='container.xl'> */}
         <ContainerBox>
        <Box display='flex' flexDir={{sm:'column-reverse',lg:'row'}} gap='5' justifyContent={{sm:'center',lg:'space-around'}} alignItems={{sm:'center',lg:'start'}}>
          <Stack maxW={{sm:'xl',lg:'md'}} paddingY={{sm:'3rem',lg:'0px'}} spacing={8}>
           <Text color='neat.primary' fontWeight='600'>
            What we do

            </Text>
            <Heading color='neat.secondary' >
       Unlock the secret to a sparkling smile
            </Heading>
            <Text color='gray' fontSize='18px' fontWeight='600' lineHeight={2}>
            Your smile is one of your most valuable assets, and keeping it clean and radiant is essential for your oral health and overall confidence. Here are some key practices to help you achieve and maintain a clean, shining smile.
            </Text>
         <Card bg="neat.primary" paddingX='30px' paddingY='15px' maxW='xs' >
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

        </Stack>
         <Box position='relative'>
           <Image src={serviceImg}
           alt='Servicea dental image'
           width={600}
           height={500}
           />
         </Box>

        </Box>
        {/* </Container> */}
        </ContainerBox>
        <Divider  color='gray_two' />
        <ContainerBox>

           <Box display={{sm:'grid',lg:'flex'}} gridTemplateColumns={{sm:'repeat(1,1fr)',md:'repeat(2,1fr)'}} justifyContent={{sm:'center',lg:'space-between'}} gap={{sm:'5',lg:'0'}} paddingTop='4rem'>
            {
              lists?.map((item) =>(
              <Flex gap='5'  alignItems={{sm:'start',lg:'center'}} justifySelf={{md:'center',lg:'auto'}} key={item?.id}>
              <Box color='neat.primary'>
              <FaCircleCheck  size={20}/>

              </Box>
              <Text as ='span' color='gray_opacity' fontSize='18px'>
                {item?.title}

              </Text>
              
            </Flex>
              ))
            }
            
          
            </Box>
        </ContainerBox>
                 
    </Box>
  )
}
