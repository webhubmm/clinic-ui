import { Box,Card,Container,Heading,Text } from "@chakra-ui/react";
import Image from "next/image";
import healthImgOne from '@/public/assets/about_health.png';
import healthImgTwo from '@/public/assets/about_health_dental.png';
import HealthCard from "./HealthCard";
import ContainerBox from "@/components/common/container/Container";

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
    <Box paddingTop={{md:'8rem',lg:'16rem'}} paddingBottom={{md:'7rem'}} >
      <Container maxW='container.xl'>
      {/* <ContainerBox> */}
       <Box display='flex' flexDir="column" gap='5'  justifyContent='center' alignItems='center'>
        <Text color='neat.primary' fontWeight='600'>
        Top priority

        </Text>
        <Heading color='neat.secondary' fontSize={{sm:'30px',md:''}}>
          Comprehensive dental care

        </Heading>
       </Box>
        
        <Box marginTop='4rem' display='flex' alignItems='center' flexDir={{sm:'column',lg:'row'}} gap={{sm:'5',lg:'10'}}>
          {
            healthLsit?.map((list,index) =>(
              
              <HealthCard list={list} key={list?.id+index}/>
            ))
          }

        </Box>

{/* </ContainerBox> */}
       </Container>
    </Box>
  )
}
