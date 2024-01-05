import React from 'react'
import { SiGoogleanalytics } from "react-icons/si";
import { Heading,Box, Grid, GridItem,Flex,Spacer ,Circle,HStack,Text} from "@chakra-ui/react";

export default function AnalysticsBox() {
  return (
      <Box height="100px" borderRadius='20px' p='20px' bg='#ffffff'>
         <HStack spacing={5}>
          <Circle size='60px' bg='#f4f7fe' color='#422afb'>
    <SiGoogleanalytics  size={24}/>
  </Circle>
  
  <Box>
    <Text  fontSize='14px'>
      Earning
    </Text>
    <Text fontSize='26px' fontWeight='bold'>
      $42423

    </Text>
    </Box>
    </HStack>
  </Box>
  )
}
