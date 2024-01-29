// Importing necessary components and hooks
'use client';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Grid, GridItem, Flex, Box, FormControl, FormLabel, Input, Button, FormErrorMessage,Text,Spinner } from '@chakra-ui/react';
import { SubmitHandler, useForm,Controller } from 'react-hook-form';
import Link from 'next/link';
import { useUserCreate } from '@/services/mutations';
import {UserList } from "@/services/queries"
import { UserCreateFormData, userType } from '@/types/userType';
import ImageUpload from '@/components/admin/adminuser/ImageUpload';

// Importing the user image
// import UserImg from '@/public/assets/asset11.webp';
import { Select } from '@chakra-ui/select';



export default function UserCreate() {
  const {
    control,register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<UserCreateFormData>();

//  const  list =UserList() ;
  // console.log(list)
  const createUserMutation = useUserCreate();

  const handleCreateUserSubmit: SubmitHandler<UserCreateFormData> = async (data: UserCreateFormData) => {
    // console.log(data,"data")
        try {
        await createUserMutation.mutate(data);
      // Handle success or redirect here
    } catch (error) {
      // Handle error
      console.log(error)
    }

    // console.log(data)
  };

  return (
    <Box className='mt-[96px]' bg='#fff' borderRadius='10px' padding='10px' minH='100hv'>
      <Flex alignItems='center' gap={3} mb='20px'>
        <Link href='/dashboard/user' passHref>
          <Flex alignItems='center' gap={5} >
            <FaArrowLeft size={20} />
            <span className='py-3'>Back To UserLists</span>
          </Flex>
        </Link>
      </Flex>
      <Box   marginX='30px'>
        
        <form onSubmit={handleSubmit(handleCreateUserSubmit)} >
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
                    {...register('name', {
                      required: 'Name is required',
                    })}
                  />

                </GridItem>
                <FormErrorMessage colorScheme="red">
                  {createUserMutation.error &&
                  (
                    <h5 onClick={() => createUserMutation.reset()}>{createUserMutation?.error}</h5>
      
                  )
                  }
                      {/* {errors.name && <Text color="red" fontSize="sm">{errors.name.message}</Text>} */}
                  {/* {errors.name && errors.name.message} */}
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
                    {...register('email', {
                      required: 'Email is required',
                    })}
                  />

                </GridItem>
                 <FormErrorMessage colorScheme="red">
                 
                      {/* {errors.name && <Text color="red" fontSize="sm">{errors.name.message}</Text>} */}
                  {errors.email && errors.email.message}
                </FormErrorMessage> 
              </FormControl>
            
         <FormControl>
                <GridItem>
                  <FormLabel
                    display="flex"
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color="#000"
                    mb="8px"
                  >
                     Password<Text color="#000">*</Text>
                  </FormLabel>
                  <Input
                    isRequired={true}
                    variant="auth"
                    fontSize="sm"
                    ms={{ base: '0px', md: '0px' }}
                    type="password"
                    placeholder="Enter Your Password"
                    mb="20px"
                    fontWeight="500"
                    size="lg"
                    border='1px'
                    borderColor='gray'
                    id="password"
                    {...register('password', {
                      required: ' Password is required',
                      // validate: (value) => value === watch('password') || 'Passwords do not match',
                    })}
                  />

                </GridItem>
                 <FormErrorMessage colorScheme="red">
                  
                      {/* {errors.name && <Text color="red" fontSize="sm">{errors.name.message}</Text>} */}
                  {errors.password && errors.password.message}
                </FormErrorMessage> 
              </FormControl>

               <FormControl>
                <GridItem>
                  <FormLabel
                    display="flex"
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color="#000"
                    mb="8px"
                  >
                    Confirm Password<Text color="#000">*</Text>
                  </FormLabel>
                  <Input
                    isRequired={true}
                    variant="auth"
                    fontSize="sm"
                    ms={{ base: '0px', md: '0px' }}
                    type="password"
                    placeholder="Confirm Your Password"
                    mb="20px"
                    fontWeight="500"
                    size="lg"
                    border='1px'
                    borderColor='gray'
                    id="password_confirmation"
                    {...register('password_confirmation', {
                      required: 'Confirm Password is required',
                      validate: (value) => value === watch('password') || 'Passwords do not match',
                    })}
                  />

                </GridItem>
                 <FormErrorMessage colorScheme="red">
                  
                      {/* {errors.name && <Text color="red" fontSize="sm">{errors.name.message}</Text>} */}
                  {errors.password_confirmation && errors.password_confirmation.message}
                </FormErrorMessage> 
              </FormControl>

            
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
                  {...register('phone', {
                    required: 'Phone is required',
                  })}
                />
                    {errors.name && <Text color="red" fontSize="sm">{errors.name.message}</Text>}

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
          // defaultValue={showData?.user?.role || ''}
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
                  isLoading={isSubmitting}
              disabled={isSubmitting}
              >
                 {(isSubmitting || createUserMutation.isPending) ? <Spinner  /> :"Create"}
              </Button>
          {/* </FormControl> */}
        </form>
       
      </Box>
       
    </Box>
  );
}

