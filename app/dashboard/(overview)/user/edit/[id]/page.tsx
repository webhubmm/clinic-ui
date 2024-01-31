'use client'
import { Select,Grid, GridItem, Flex, Box, FormControl, FormLabel, Input, Button, FormErrorMessage,Text ,Spinner} from '@chakra-ui/react';

import UserImg from '@/public/assets/asset 11.webp';
import Image from 'next/image'
import { Textarea } from '@chakra-ui/react';
import {  FaArrowLeft} from "react-icons/fa";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';  
import { UserCreateFormData } from '@/types/userType';
import { useUserUpdate } from '@/services/mutations';
import { useParams } from 'next/navigation'
import { userList, updateUser } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export default function EditHoliday({params}:{
  params:{id:string}
}) {
const  {id} =params;
  console.log(id);
   const {
    control,register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<UserCreateFormData>();

  const {
    data:users,
    isLoading,isError,isPending
  } =useQuery({
    queryKey:['users'],
    queryFn:() =>userList(id)
  })
  const showData =users?.data;
  // console.log("usersedit",showData);
 const userUpdateMutation =useUserUpdate();

 const handelSubmitUpdateUser:SubmitHandler<UserCreateFormData> = async (updateData) => {
  // console.log("updateData",updateData,id);
  try {
    await userUpdateMutation.mutate({id,updateData});
    // Handle success or redirect here
  } catch (error) {
    // Handle error
    console.log(error);
  }
};

  return (
  <Box className='mt-[96px]' bg='#fff' borderRadius='10px' padding='10px' minH='100hv'>
      <Flex alignItems='center' gap={3} mb='20px'>
        <Link href='/dashboard/user' passHref>
          <Flex alignItems='center' gap={5} >
            <FaArrowLeft size={20} />
            <p className='py-3'>Back </p>
          </Flex>
        </Link>
      </Flex>
       <Box   marginX='30px' minW='50%'>
          
        <form onSubmit={handleSubmit(handelSubmitUpdateUser)} >
           {/* <FormControl flex='1'> */}
             <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={3}>
               <FormControl>
                 <GridItem>
                   <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="#000" mb="8px">
                     Name<Text color="#000">*</Text>
                   </FormLabel>
                   <Input
                    isRequired={true}
                    variant="auth"
                    fontSize="sm"
                    ms={{ base: '0px', md: '0px' }}
                    type="text"
                    placeholder="Enter Your Name"
                    mb="20px"
                    fontWeight="500"
                    size="lg"
                    border='1px'
                    id='name'
                    borderColor='gray'
                    defaultValue={showData?.user?.name || ''}
                    {...register('name', {
                      required: 'Name is required',
                    })}
                  />
                </GridItem>
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <GridItem>
                  <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="#000" mb="8px">
                    Email<Text color="#000">*</Text>
                  </FormLabel>
                  <Input
                    isRequired={true}
                    variant="auth"
                    fontSize="sm"
                    ms={{ base: '0px', md: '0px' }}
                    type="email"
                    placeholder="Enter your Email"
                    mb="20px"
                    fontWeight="500"
                    size="lg"
                    border='1px'
                    borderColor='gray'
                    id="email"
                    defaultValue={showData?.user?.email || ''}

                    {...register('email', {
                      required: 'Email is required',
                    })}
                  />
                </GridItem>
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
            
        

            
            {/* ... (rest of the form fields) */}
 <FormControl>
              <GridItem>
                <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="#000" mb="8px">
                  Phone<Text color="#000">*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: '0px', md: '0px' }}
                  type="tel"
                  placeholder="Enter Your PhoneNumber"
                  mb="20px"
                  fontWeight="500"
                  size="lg"
                  border='1px'
                  borderColor='gray'
                  id='phone'
                    defaultValue={showData?.user?.phone || ''}

                  {...register('phone', {
                    required: 'Phone is required',
                  })}
                />
              </GridItem>
            </FormControl>
            <FormControl>
              <GridItem>
                <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="#000" mb="8px">
                  Role<Text color="#000">*</Text>
                </FormLabel>
               
                 <Controller
          name="role"
          control={control}
          defaultValue={showData?.user?.role || ''}
          rules={{ required: 'Role is required' }}
          render={({ field }) => (
            <Select
              placeholder='Select Role'
              size='lg'
              {...field}
            >
              {/* You can customize the options as needed */}
              <option value='admin'>admin</option>
              <option value='staff'>staff</option>
              <option value='user'>user</option>
            </Select>
          )}
        />
              </GridItem>
            </FormControl>
             <FormControl>
              <GridItem>
              </GridItem>
            </FormControl>
          </Grid>
            <Flex justifyContent='flex-end'>
              <Button
                type='submit'
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                mb='20px'
                bg='#332941'
                color='#fff'
                  isLoading={isLoading}
              disabled={isSubmitting}
              >
                 {(isSubmitting ||  userUpdateMutation.isPending) ?  <Spinner  /> :"Update"}
              </Button>
            </Flex>
          {/* </FormControl> */}
        </form>
       
      </Box>
    </Box>
  )
}
