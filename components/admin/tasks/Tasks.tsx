import { Card, Flex, Text,Flex,HStack ,Center,HStack,Text, Card, Center,Box, Table, Thead, Tr, Th, Tbody, Checkbox, Progress, Td, Select} from "@chakra-ui/react";
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';

export default function Tasks() {
  return (
    <Card p='20px' alignItems='center' flexDirection='column' w='100%'>
		<Flex px='25px' mb="5px" justifyContent='space-between' align='center'>
				<Text color='#000' fontSize='22px' fontWeight='700' lineHeight='100%'>
					Tasks
				</Text>
	   <HStack >
          <Center height='40px' bg="#f4f7fe" p='10px' borderRadius='10px'>
          <BsThreeDots  size={20}/>
          </Center>
        </HStack> 

			</Flex>
			<Box px='11px' w='100%'>
				<Flex w='100%' justify='space-between' mb='20px'>
					<Checkbox me='16px' colorScheme='brandScheme' />
					<Text fontWeight='bold' color="#000" fontSize='md' textAlign='start'>
						Landing Page Design
					</Text>
					{/* <Icon ms='auto' as={MdDragIndicator} color='secondaryGray.600' w='24px' h='24px' /> */}
				</Flex>
				<Flex w='100%' justify='space-between' mb='20px'>
					<Checkbox me='16px' defaultChecked colorScheme='brandScheme' />
					<Text fontWeight='bold' color={`#000`} fontSize='md' textAlign='start'>
						Dashboard Builder
					</Text>
					{/* <Icon ms='auto' as={MdDragIndicator} color='secondaryGray.600' w='24px' h='24px' /> */}
				</Flex>
				<Flex w='100%' justify='space-between' mb='20px'>
					<Checkbox defaultChecked me='16px' colorScheme='brandScheme' />
					<Text fontWeight='bold' color='#00' fontSize='md' textAlign='start'>
						Mobile App Design
					</Text>
					{/* <Icon ms='auto' as={} color='secondaryGray.600' w='24px' h='24px' /> */}
				</Flex>
				<Flex w='100%' justify='space-between' mb='20px'>
					<Checkbox me='16px' colorScheme='brandScheme' />
					<Text fontWeight='bold' color='#00' fontSize='md' textAlign='start'>
						Illustrations
					</Text>
					{/* <Icon ms='auto' as='' color='secondaryGray.600' w='24px' h='24px' /> */}
				</Flex>
				<Flex w='100%' justify='space-between' mb='20px'>
					<Checkbox defaultChecked me='16px' colorScheme='brandScheme' />
					<Text fontWeight='bold' color='#00' fontSize='md' textAlign='start'>
						Promotional LP
					</Text>
					{/* <Icon ms='auto' as={MdDragIndicator} color='secondaryGray.600' w='24px' h='24px' /> */}
				</Flex>
			</Box>
		</Card>
  )
}
