// Importing necessary components and hooks
'use client';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Grid, GridItem, Flex, Box, FormControl, FormLabel, Input, Button, FormErrorMessage,Text } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useUserCreate } from '@/services/mutations';
import {UserList } from "@/services/queries"
import { UserCreateFormData, userType } from '@/types/userType';





export default function UserEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<UserCreateFormData>();

//  const  list =UserList() ;
  // console.log(list)
  const createUserMutation = useUserCreate();

  const handleCreateUserSubmit: SubmitHandler<UserCreateFormData> = async (data: UserCreateFormData) => {
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
      <Flex gap={5} justifyContent='center' alignItems='center'>
        <Box display={{ base: 'none', lg: 'block' }}> 
          {/* <Image src={UserImg} alt='userImg' width={300} height={300} sizes='95vw' style={{ width: '100%', height: 'auto' }} /> */}
        </Box>
        <form onSubmit={handleSubmit(handleCreateUserSubmit)} >
           <FormControl flex='1'>
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
                    {...register('email', {
                      required: 'Email is required',
                    })}
                  />
                </GridItem>
                <FormErrorMessage>
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
                <FormErrorMessage>
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
                <FormErrorMessage>
                  {errors.password_confirmation && errors.password_confirmation.message}
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
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: '0px', md: '0px' }}
                  type="text"
                  placeholder="Enter Your Role"
                  mb="20px"
                  fontWeight="500"
                  size="lg"
                  border='1px'
                  borderColor='gray'
                  id='role'
                  {...register('role', {
                    required: 'Role is required',
                  })}
                />
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
                  isLoading={isSubmitting}
              disabled={isSubmitting}
              >
                 {(isSubmitting && createUserMutation.isPending) ? "loading" :"Update"}
              </Button>
            </Flex>
          </FormControl>
        </form>
       
      </Flex>
    </Box>
  );
}

//  <form onSubmit={handleSubmit(handleCreateUserSubmit)}>
//           <FormControl flex='1'>
//             <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={3}>
//               <FormControl>
//                 <GridItem>
//                   <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="#000" mb="8px">
//                     Name<Text color="#000">*</Text>
//                   </FormLabel>
//                   <Input
//                     isRequired={true}
//                     variant="auth"
//                     fontSize="sm"
//                     ms={{ base: '0px', md: '0px' }}
//                     type="text"
//                     placeholder="Enter Your Name"
//                     mb="20px"
//                     fontWeight="500"
//                     size="lg"
//                     border='1px'
//                     id='name'
//                     borderColor='gray'
//                     {...register('name', {
//                       required: 'Name is required',
//                     })}
//                   />
//                 </GridItem>
//                 <FormErrorMessage>
//                   {errors.name && errors.name.message}
//                 </FormErrorMessage>
//               </FormControl>
//               <FormControl>
//                 <GridItem>
//                   <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="#000" mb="8px">
//                     Email<Text color="#000">*</Text>
//                   </FormLabel>
//                   <Input
//                     isRequired={true}
//                     variant="auth"
//                     fontSize="sm"
//                     ms={{ base: '0px', md: '0px' }}
//                     type="email"
//                     placeholder="Enter your Email"
//                     mb="20px"
//                     fontWeight="500"
//                     size="lg"
//                     border='1px'
//                     borderColor='gray'
//                     id="email"
//                     {...register('email', {
//                       required: 'Email is required',
//                     })}
//                   />
//                 </GridItem>
//                 <FormErrorMessage>
//                   {errors.email && errors.email.message}
//                 </FormErrorMessage>
//               </FormControl>
//             </Grid>
//              <FormControl>
//                 <GridItem>
//                   <FormLabel
//                     display="flex"
//                     ms="4px"
//                     fontSize="sm"
//                     fontWeight="500"
//                     color="#000"
//                     mb="8px"
//                   >
//                      Password<Text color="#000">*</Text>
//                   </FormLabel>
//                   <Input
//                     isRequired={true}
//                     variant="auth"
//                     fontSize="sm"
//                     ms={{ base: '0px', md: '0px' }}
//                     type="password"
//                     placeholder="Enter Your Password"
//                     mb="20px"
//                     fontWeight="500"
//                     size="lg"
//                     border='1px'
//                     borderColor='gray'
//                     {...register('password', {
//                       required: ' Password is required',
//                       validate: (value) => value === watch('password') || 'Passwords do not match',
//                     })}
//                   />
//                 </GridItem>
//                 <FormErrorMessage>
//                   {errors.confirmPassword && errors.confirmPassword.message}
//                 </FormErrorMessage>
//               </FormControl>
//                <FormControl>
//                 <GridItem>
//                   <FormLabel
//                     display="flex"
//                     ms="4px"
//                     fontSize="sm"
//                     fontWeight="500"
//                     color="#000"
//                     mb="8px"
//                   >
//                     Confirm Password<Text color="#000">*</Text>
//                   </FormLabel>
//                   <Input
//                     isRequired={true}
//                     variant="auth"
//                     fontSize="sm"
//                     ms={{ base: '0px', md: '0px' }}
//                     type="password"
//                     placeholder="Confirm Your Password"
//                     mb="20px"
//                     fontWeight="500"
//                     size="lg"
//                     border='1px'
//                     borderColor='gray'
//                     {...register('confirmPassword', {
//                       required: 'Confirm Password is required',
//                       validate: (value) => value === watch('password') || 'Passwords do not match',
//                     })}
//                   />
//                 </GridItem>
//                 <FormErrorMessage>
//                   {errors.confirmPassword && errors.confirmPassword.message}
//                 </FormErrorMessage>
//               </FormControl>
//             {/* ... (rest of the form fields) */}

//             <FormControl>
//               <GridItem>
//                 <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="#000" mb="8px">
//                   Role<Text color="#000">*</Text>
//                 </FormLabel>
//                 <Input
//                   isRequired={true}
//                   variant="auth"
//                   fontSize="sm"
//                   ms={{ base: '0px', md: '0px' }}
//                   type="text"
//                   placeholder="Enter Your Role"
//                   mb="20px"
//                   fontWeight="500"
//                   size="lg"
//                   border='1px'
//                   borderColor='gray'
//                   {...register('role', {
//                     required: 'Role is required',
//                   })}
//                 />
//               </GridItem>
//             </FormControl>
            
//             <Flex justifyContent='flex-end'>
//               <Button
//                 type='submit'
//                 fontSize='sm'
//                 variant='brand'
//                 fontWeight='500'
//                 w='100%'
//                 h='50'
//                 mb='20px'
//                 bg='#332941'
//                 color='#fff'
//                 isLoading={isSubmitting}
//               >
//                  {isSubmitting ? "loading" :"Create"}
//               </Button>
//             </Flex>
//           </FormControl>
//         </form>
