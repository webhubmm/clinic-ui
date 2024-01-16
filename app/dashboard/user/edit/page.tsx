import { GridItem,Card,Grid,Flex,Box,FormControl,FormLabel,Text ,Input,Button} from '@chakra-ui/react';
import UserImg from '@/public/assets/asset 11.webp';
import Image from 'next/image'
import { Textarea } from '@chakra-ui/react';
import {  FaArrowLeft} from "react-icons/fa";
import Link from 'next/link';  
export default function EditUser() {
  return (
   <Box className='mt-[96px]' bg='#fff' borderRadius='10px' padding='10px' minH='100hv'>
      <Flex alignItems='center' gap={3}  mb='20px'>
      <Link href='/dashboard/user' className='flex items-center gap-5'>
      <FaArrowLeft size={20}/>
      <span className='py-3'>Back To UserLists</span>
      </Link>
      </Flex>
      <Flex  gap={5} justifyContent='center' alignItems='center'>
          
        
      <FormControl maxW={{lg:'50vw'}}>
    <Grid templateColumns={{base:'1fr',md:'1fr 1fr'}} gap={3}>
                 <GridItem>
                   <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color="#000"
              mb="8px"
            >
              Name<Text color="#000">*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="Enter Your Name"
              mb="20px"
              fontWeight="500"
              size="lg"
              border='1px'
              borderColor='gray'

            />
           </GridItem>
           <GridItem>
               <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color="#000"
              mb="8px"
            >
              Email<Text color="#000">*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="mail@simmmple.com"
              mb="20px"
              fontWeight="500"
              size="lg"
              border='1px'
              borderColor='gray'

            />
                  </GridItem>

<GridItem>
                <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color="#000"
              mb="8px"
            >
              DoctorName<Text color="#000">*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="Enter Doctor Name"
              mb="20px"
              fontWeight="500"
              size="lg"
              border='1px'
              borderColor='gray'

            />
</GridItem>
<GridItem>
                <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color="#000"
              mb="8px"
            >
              Date<Text color="#000">*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="datetime-local"
              placeholder="Select Date and Time"
              mb="20px"
              fontWeight="500"
              size="lg"
              border='1px'
              borderColor='gray'

            />
</GridItem>


<GridItem colSpan={{md:'2'}}>
    <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color="#000"
              mb="8px"
            >
              Address<Text color="#000">*</Text>
            </FormLabel>
              
     <Textarea variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              mb="20px"
              fontWeight="500"
              size="lg"
              border='1px'
              borderColor='gray' 
             placeholder='Enter Your Add  ress' />          
</GridItem>
      </Grid>
           <Box maxW={{md:'200px'}}  flexBasis='1'>
             <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="50"
            mb="20px"
            bg='#332941'
            color='#fff'
          >
            Update
          </Button>
            </Box>
            </FormControl>
        </Flex>
    </Box>

  )
}
