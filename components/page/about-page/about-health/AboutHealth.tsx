import { Box,Card,Container,Heading,Text } from "@chakra-ui/react";
import Image from "next/image";
import healthImgOne from '@/public/assets/about_health.png';
import healthImgTwo from '@/public/assets/about_health_dental.png';
import HealthCard from "./HealthCard";

const healthLsit =[
  {
    id:1,
    title:'Good dental care is healthy mouth',
    img:healthImgOne,
    desc:"Key points to keep in mind for maintaining good dental care",
    listOne:"Brush twice a day",
    listTwo:"Floss daily",
    listThree:"Don't use tobacco"
  },
   {
    id:2,
    title:'Top foods to keep your teeth healthy',
    img:healthImgTwo,
    desc:"Our team has years of experience providing high-quality dental care.",
     listOne:"Dairy products",
    listTwo:"Fruits and vegetables",
    listThree:"Nuts and seeds"
  }
]
export default function AboutHealth() {
  return (
    <Box paddingTop='16rem' paddingBottom='7rem' >
      <Container maxW='container.xl'>
       <Box display='flex' flexDir="column" gap='5'  justifyContent='center' alignItems='center'>
        <Text color='neat.primary' fontWeight='600'>
        Top priority

        </Text>
        <Heading color='neat.secondary' >
          Comprehensive dental care

        </Heading>
       </Box>
        
        <Box marginTop='4rem' display='flex' gap='10'>
          {
            healthLsit?.map((list,index) =>(
              
              <HealthCard list={list} key={list?.id+index}/>
            ))
          }
            {/* <Card padding='2.5rem' borderRadius='12px'>
            <Heading color='neat.secondary' marginBottom='30px' fontSize='1.7rem'>
              Good dental care is healthy mouth

            </Heading>
            <Box display="flex" gap='10'>
               <Image src={healthImgTwo} alt="" width={200} height={300}/>
               <Box maxW='sm'>
                  <Text color='slate' fontSize='lg' fontWeight='600' lineHeight={2}>
                  Key points to keep in mind for maintaining good dental care
                  </Text>
                  
               </Box>

            </Box>
          </Card> */}
        </Box>


       </Container>
    </Box>
  )
}
