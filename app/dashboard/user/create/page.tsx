import { GridItem,Card,Grid,Flex,Box,FormControl,FormLabel,Text ,Input,Button} from '@chakra-ui/react';
import UserImg from '@/public/assets/asset 11.webp';
import Image from 'next/image'
import { Textarea } from '@chakra-ui/react';
export default function UserCreate() {
  return (
    <Box className='mt-[96px]' bg='#fff' borderRadius='10px' padding='10px' minH='100hv'>
      <Flex  gap={5} justifyContent='center' alignItems='center'>
          
        <Box >
       <Image src={UserImg} alt='userImg' width={0}
       height={0}
        sizes="95vw"
        style={{ width: '100%', height: 'auto' }} />
      </Box>
      <FormControl flex='1'>
    <Grid templateColumns='1fr 1fr' gap={3}>
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


<GridItem colSpan='2'>
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
             placeholder='Enter Your Address' />          
</GridItem>
      </Grid>
           <Flex justifyContent='flex-end'>
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
            Create
          </Button>
            </Flex>
            </FormControl>
        </Flex>
    </Box>
  )
}
