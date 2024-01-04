import {Box, Card, Table, Checkbox,Text, Tbody, Td, Grid,GridItem, Th, Thead, Tr,Progress,Flex,HStack ,Center} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

export default function Tables() {
  return (
    <Grid mt='90px' px='9px' templateColumns="repeat(2, 1fr)" gap={8}>

    {/* <Flex  alignItems='center' gap={10} > */}
   <GridItem>
         <Card flexDirection='column' w='100%' x='10px' overflowX={{ sm: 'scroll', lg: 'hidden' }}  zIndex='10'>
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
  <Table   bg='#ffffff' size='lg' variant='unstyle' borderRadius='20px'  >
    <Thead borderBottom='1px'>
      <Tr>
        <Th>Name</Th>
        <Th >Email</Th>
        <Th >Date </Th>
        <Th >Progress</Th>
        


      </Tr>
    </Thead>
    <Tbody fontWeight="bold">
      <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>

   
 <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
      <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
        <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
   <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
        <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
        <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
        <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
    </Tbody>
   
  </Table>
  </Card>
   </GridItem>

  <GridItem>
     <Card flexDirection='column' w='100%' x='10px' overflowX={{ sm: 'scroll', lg: 'hidden' }} >
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
  <Table   bg='#ffffff' size='lg' variant='unstyle' borderRadius='20px'  >
    <Thead borderBottom='1px'>
      <Tr>
        <Th>Name</Th>
        <Th >Email</Th>
        <Th >Date </Th>
        <Th >Progress</Th>
        


      </Tr>
    </Thead>
    <Tbody fontWeight="bold">
      <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>

   
 <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
      <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
        <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
   <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
        <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
        <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
        <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
    </Tbody>
   
  </Table>
  </Card>
    </GridItem>

      <GridItem>
         <Card flexDirection='column' w='100%' x='10px' overflowX={{ sm: 'scroll', lg: 'hidden' }} >
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
  <Table   bg='#ffffff' size='lg' variant='unstyle' borderRadius='20px'  >
    <Thead borderBottom='1px'>
      <Tr>
        <Th>Name</Th>
        <Th >Status</Th>
        <Th >Date </Th>
        <Th >Progress</Th>
        


      </Tr>
    </Thead>
    <Tbody fontWeight="bold">
      <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress  hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>

   
 <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
      <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
        <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
   <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
        <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
       
    </Tbody>
   
  </Table>
  </Card>
   </GridItem>

  <GridItem>
     <Card flexDirection='column' w='100%' x='10px' overflowX={{ sm: 'scroll', lg: 'hidden' }} >
       <Flex p='25px' mb="8px" justifyContent='space-between' align='center'>
				<Text  fontSize='22px' mb="4px" fontWeight='700' lineHeight='100%'>
					Check Table
				</Text>
			</Flex>
  <Table   bg='#ffffff' size='lg' variant='unstyle' borderRadius='20px'  >
    <Thead borderBottom='1px'>
      <Tr>
        <Th>Name</Th>
        <Th >Status</Th>
        <Th >Date </Th>
        <Th >Progress</Th>
        


      </Tr>
    </Thead>
    <Tbody fontWeight="bold">
      <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>

   
 <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
      <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
        <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
   <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
        <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
      
    </Tbody>
   
  </Table>
  </Card>
    </GridItem>

  
    {/* </Flex> */}
    </Grid>
  )
}
