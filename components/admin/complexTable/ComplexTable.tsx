import React from 'react'
import { Box, Grid, GridItem,Flex,Spacer ,Circle,HStack,Text, Card, Center, Table, Thead, Tr, Th, Tbody, Checkbox, Progress, Td, Select} from "@chakra-ui/react";

export default function ComplexTable() {
  return (
    <Table size='md'  variant='simple' color='gray.500'   borderRadius='20px'  >
    <Thead >
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
        
    </Tbody>
   
  </Table>
  )
}
