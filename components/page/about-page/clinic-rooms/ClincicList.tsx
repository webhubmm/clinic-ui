import { Box, Card, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

interface ListProps {
   
   listO:string;
  listT:string;
  listTh:string;
}

export default function ClinicList(
  {list}
  :
  {list:ListProps}) 
  {
  return (
           
            
    <Box >

             <Flex gap='5'>
              <Box color='neat.primary'>
              <FaCircleCheck  size={20}/>

              </Box>
              <Text as ='span' color='gray_opacity'>
                  {list?.listT}
              </Text>
              
            </Flex>
 <Flex gap='5'>
              <Box color='neat.primary'>
              <FaCircleCheck  size={20}/>

              </Box>
              <Text as ='span' color='gray_opacity'>
                  {list?.listTh}
              </Text>
              
            </Flex>
            </Box>
             
              
  )
}
