import { Box, Card, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";

interface ListProps {
    title:string;
    img:string;
    desc:string;
    listOne:string;
    listTwo:string;
    listThree:string
}

export default function HealthCard(
  {list}
  :
  {list:ListProps}) 
  {
  return (
  <Card padding={{sm:'2rem',lg:'2.5rem'}} borderRadius='12px' maxW={{md:'80%',lg:"100%"}}>
            <Heading color='neat.secondary' marginBottom='30px' fontSize='1.7rem'>
              {list?.title}

            </Heading>
            <Box display="flex" flexDir={{sm:'column',md:'row'}} gap={{sm:'5',md:'10'}}>
               <Image src={list?.img} alt="" width={200} height={300}/>
               <Box maxW='md' display='grid' gap='8'>
                  <Text color='slate' fontSize='lg' fontWeight='600' lineHeight={2}>
                  {list.desc}
                  </Text>
                     <Stack spacing={2}>
              <Flex gap='5'>
              <Box color='neat.primary'>
              <FaCircleCheck  size={20}/>

              </Box>
              <Text as ='span'>
                 {list?.listOne}
              </Text>
              
            </Flex>
             <Flex gap='5'>
              <Box color='neat.primary'>
              <FaCircleCheck  size={20}/>

              </Box>
              <Text as ='span'>
                  {list?.listTwo}
              </Text>
              
            </Flex>
 <Flex gap='5'>
              <Box color='neat.primary'>
              <FaCircleCheck  size={20}/>

              </Box>
              <Text as ='span'>
                  {list?.listThree}
              </Text>
              
            </Flex>
                </Stack>
               </Box>
 
            </Box>
              
          </Card>
  )
}
