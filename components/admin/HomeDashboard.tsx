import { Heading,Box, Grid, GridItem,Flex,Spacer ,Circle,HStack,Text} from "@chakra-ui/react";
import { SiGoogleanalytics } from "react-icons/si";
import { FaDollarSign } from "react-icons/fa6";
import AnalysticsBox from "./analysticsbox/AnalysticsBox";

export default function HomeDashboard() {
  return (
   <Box px='8px'>
      <Grid templateColumns="repeat(3, 1fr)" gap={5} >
      <GridItem>
      <AnalysticsBox />
      </GridItem>
      <GridItem>
        <AnalysticsBox />
       
      </GridItem>
   <GridItem>
      <AnalysticsBox />

      </GridItem>
  <GridItem>
      <AnalysticsBox />

      </GridItem>
            <GridItem>
      <AnalysticsBox />
      
      </GridItem>
      <GridItem>
      <AnalysticsBox />

      </GridItem>
      </Grid>
  
   <Grid templateColumns="repeat(2, 1fr)" my='22px' gap={5} >
      <GridItem>
        <Box borderRadius='20px' p='20px' bg='#ffffff' height='300px'>
         
        </Box>
     </GridItem>
           <GridItem>
        <Box borderRadius='20px' p='20px' bg='#ffffff' height='300px'>
         
        </Box>
     </GridItem>
   </Grid>
        <Grid templateColumns="repeat(2, 1fr)" my='22px' gap={5} >
      <GridItem>
        <Box borderRadius='20px' p='20px' bg='#ffffff' height='300px'>
         
        </Box>
     </GridItem>
           <GridItem >
  <HStack spacing='10px'>
           <Box borderRadius='20px' p='20px' bg='#ffffff' height='300px' width='100%'>


         
        </Box>
       <Box borderRadius='20px' p='20px' bg='#ffffff' height='300px' width='100%'>
         
        </Box>
   </HStack>
     </GridItem>
           <GridItem>
        <Box borderRadius='20px' p='20px' bg='#ffffff' height='300px'>
         
        </Box>
     </GridItem>
           <GridItem >
  <HStack spacing='10px'>
           <Box borderRadius='20px' p='20px' bg='#ffffff' height='300px' width='100%'>


         
        </Box>
       <Box borderRadius='20px' p='20px' bg='#ffffff' height='300px' width='100%'>
         
        </Box>
   </HStack>
     </GridItem>
   </Grid>
</Box>


  );
}
