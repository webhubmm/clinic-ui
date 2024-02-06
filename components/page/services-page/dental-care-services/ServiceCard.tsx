import { Box, Card, CardHeader,CardBody, Container,Heading,Text } from "@chakra-ui/react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import oralimg from '@/public/assets/asset 12.svg';

export default function ServiceCard({item}:{
  item:{
     title:string;
    imgIcons:string;
    desc:string;
  }
}) {
  return (
   <Card bg='brands.logInBgColor' padding='1.5rem' boxShadow='md' maxW={{sm:'xs',lg:'xs'}} borderRadius='10px'>
               <CardHeader>
              <Image src={item?.imgIcons} alt='service img alt' width={60} height={60}/>
                 
               </CardHeader>
               <CardBody  maxW='sm'>
                 <Heading color='neat.secondary' size='md' >
                   {item?.title}
                  </Heading> 
          <Text py='2' fontSize='md' color='slate' lineHeight={2}>
          {item?.desc}
        </Text>
        <Box pt='2' display='flex' alignItems='center' gap='5'>
           <Text  color='neat.primary'>
            <FaArrowRight size={20}/>
           </Text>

          <Text as='span' color='neat.secondary'>
                        Read More
          </Text>

         </Box>   
               </CardBody>
             </Card>   
  )
}
