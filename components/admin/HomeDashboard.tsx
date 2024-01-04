import { Heading,Box, Grid, GridItem,Flex,Spacer ,Circle,HStack,Text} from "@chakra-ui/react";
import { SiGoogleanalytics } from "react-icons/si";

export default function HomeDashboard() {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4} px='8px'>
      <GridItem>
        <Box height="100px" borderRadius='15px' p='15px' bg='#ffffff'>
         <HStack spacing={10}>
          <Circle size='50px' bg='#f4f7fe' color='#422afb'>
    <SiGoogleanalytics  size={20}/>
  </Circle>
  
  <Box>
    <Text>
      Earning
    </Text>
    <Text fontSize='26px'>
      $42423

    </Text>
  </Box>
         </HStack>
        </Box>
      </GridItem>
      <GridItem>
        <Box height="100px" borderRadius='15px' p='15px' bg='#ffffff'>
          Box1
        </Box>
      </GridItem>
          <GridItem>
        <Box height="100px" borderRadius='15px' p='15px' bg='#ffffff'>
          Box1
        </Box>
      </GridItem>
           <GridItem>
        <Box height="100px" borderRadius='15px' p='15px' bg='#ffffff'>
          Box1
        </Box>
      </GridItem>
            <GridItem>
        <Box height="100px" borderRadius='15px' p='15px' bg='#ffffff'>
          Box1
        </Box>
      </GridItem>
      <GridItem>
        <Box height="100px" borderRadius='15px' p='15px' bg='#ffffff'>
          Box1
        </Box>
      </GridItem>
   
    <GridItem colSpan={3} >
      <Flex  gap={3}>
    <Box  width='50%' border='1px'>
      Box8
    </Box>
    <Spacer />
      <Box  border='1px' width='50%'>
      Box9
      </Box>
    </Flex>
    </GridItem>
   

<GridItem>
        <Box border="1px" height="80px">
          Box1
        </Box>
      </GridItem>
      <GridItem>
        <Box border="1px" height="80px">
          Box2
        </Box>
      </GridItem>
      <GridItem>
        <Box border="1px" height="80px">
          Box3
        </Box>
      </GridItem>
      <GridItem>
        <Box border="1px" height="80px">
          Box4
        </Box>
      </GridItem>
    
   
    </Grid>


  );
}
