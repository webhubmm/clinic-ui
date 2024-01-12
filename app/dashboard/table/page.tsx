import CheckTable from "@/components/admin/checkTable/CheckTable";
import {Box, Card, Table, Checkbox,Text, Tbody, Td, Grid,GridItem, Th, Thead, Tr,Progress,Flex,HStack ,Center} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

export default function Tables() {
  return (
    <Grid mt='96px' px='7px' templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)'}} gap={5}>

    {/* <Flex  alignItems='center' gap={10} > */}
  <GridItem>
         <Card flexDirection='column' w={{base:'70%',md:'100%'}} x='10px' overflowX={{ base: 'scroll', lg: 'hidden' }}  zIndex='10' bg='#fff'>
       <Flex p='25px' mb="8px" justifyContent='space-between' align='center'>
				<Text  fontSize='22px' mb="4px" fontWeight='700' lineHeight='100%'>
					Complex Table
				</Text>
        <HStack >
          <Center height='40px' bg="#f4f7fe" p='10px' borderRadius='10px'>
          <BsThreeDots  size={20}/>
          </Center>
        </HStack>
			</Flex>
      <CheckTable />
  
  </Card>
   </GridItem>

   <GridItem>
         <Card flexDirection='column' w={{base:'70%',md:'100%'}} x='10px' overflowX={{ base: 'scroll', lg: 'hidden' }}  zIndex='10' bg='#fff'>
       <Flex p='25px' mb="8px" justifyContent='space-between' align='center'>
				<Text  fontSize='22px' mb="4px" fontWeight='700' lineHeight='100%'>
					Check Table
				</Text>
        <HStack >
          <Center height='40px' bg="#f4f7fe" p='10px' borderRadius='10px'>
          <BsThreeDots  size={20}/>
          </Center>
        </HStack>
			</Flex>
      <CheckTable />
  
  </Card>
   </GridItem>

  

 <GridItem>
         <Card flexDirection='column' w={{base:'70%',md:'100%'}} x='10px' overflowX={{ base: 'scroll', lg: 'hidden' }}  zIndex='10' bg='#fff'>
       <Flex p='25px' mb="8px" justifyContent='space-between' align='center'>
				<Text  fontSize='22px' mb="4px" fontWeight='700' lineHeight='100%'>
					Complex Table
				</Text>
        <HStack >
          <Center height='40px' bg="#f4f7fe" p='10px' borderRadius='10px'>
          <BsThreeDots  size={20}/>
          </Center>
        </HStack>
			</Flex>
      <CheckTable />
  
  </Card>
   </GridItem>

   <GridItem>
         <Card flexDirection='column' w={{base:'70%',md:'100%'}} x='10px' overflowX={{ base: 'scroll', lg: 'hidden' }}  zIndex='10' bg='#fff'>
       <Flex p='25px' mb="8px" justifyContent='space-between' align='center'>
				<Text  fontSize='22px' mb="4px" fontWeight='700' lineHeight='100%'>
					Check Table
				</Text>
        <HStack >
          <Center height='40px' bg="#f4f7fe" p='10px' borderRadius='10px'>
          <BsThreeDots  size={20}/>
          </Center>
        </HStack>
			</Flex>
      <CheckTable />

  </Card>
   </GridItem>

  
    {/* </Flex> */}
    </Grid>
  )
}
