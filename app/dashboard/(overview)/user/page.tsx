"use client";
// import CreateUser from "@/components/admin/adminuser/CreateUser";
import {
  Flex,
  Text,
  Button,
  Box,
  Stack,
  HStack,
  Input,
  Alert
} from "@chakra-ui/react";
import { FaRegTrashAlt, FaRegEdit, FaTrashRestore } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { forceDeleteUser, getUser } from "@/services/api";
import { UserList } from "@/services/queries";
import { userType } from "@/types/userType";
import PulseLoader from "react-spinners/PulseLoader";
import { FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  setApiUserData, setUserSearch } from "@/services/feature/dashboardUserSlice";
import Image from "next/image";
import { deleteUser } from '../../../../services/api';
import { useDeleteUser, usePermentDeleteUser, useRestoreUser } from "@/services/mutations";
import Swal from "sweetalert2";
interface RootState {
  dashboardData: {
    userList: userType; // Adjust the type accordingly
  };
}


export default function UserManagement() {
  const [trashList, setTrashList] = useState(false);
  const dispatch = useDispatch();
  // Redux state - getting user data
  const userData = useSelector(
    (state: RootState) => state.dashboardData.userList
  );

  // for search user
 const userSearch =useSelector( (state) => state.dashboardData.search
 )

 console.log(userSearch)

  // console.log("userData", userData);
  const  {data:users,isFetching,isLoading,isError} = UserList() as {
    data: userType;
    isFetching: boolean;
    isLoading:boolean;
    isError: any;
  };


  // delete
  const deleteUserMutation =useDeleteUser();
  const restoreUserMutation=useRestoreUser();
  const forceUserMutation =usePermentDeleteUser();

  // user search
 const handleUserChange =(e: React.ChangeEvent<HTMLInputElement>) =>{
   return dispatch(setUserSearch(e.target.value))
 }

  const handleTrashList = () => {
    setTrashList((prev) => !prev);
  };

  //  handle delete user
  const handleDeleteUser =(id:number) =>{
    console.log(id)
    Swal.fire({
   title: 'Are you sure delete?',
   text: 'User will have Admin Privileges',
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#d33',
   cancelButtonColor: '#3085d6',
   confirmButtonText: ' Delete!'
 }).then((result) => {
   if (result.isConfirmed) {
     deleteUserMutation.mutate(id);
     Swal.fire(
       'Deleted!',
       'User has been deleted.',
       'success'
     )
   }
 })
  }

  //  handle force delete user
  const handleForceDeleteUser =(id:number) =>{
    console.log(id)
    Swal.fire({
   title: 'Are you sure?',
   text: 'User will be permanently deleted',
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#d33',
   cancelButtonColor: '#3085d6',
   confirmButtonText: ' Sure_Delete!'
 }).then((result) => {
   if (result.isConfirmed) {
     forceUserMutation.mutate(id);
     Swal.fire(
       ' Perment Deleted!',
       'User has been permently deleted.',
       'success'
     )
   }
 })
  }

  //  handle restore user
  const handleRestoreUser =(id:number) =>{
    console.log(id)
    Swal.fire({
   title: 'Are you sure?',
   text: 'User will be restored',
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: ' Restore!'
 }).then((result) => {
   if (result.isConfirmed) {
     restoreUserMutation.mutate(id);
     Swal.fire(
       'Restored!',
       'User has been restored.',
       'success'
     )
   }
 })
  }



  // console.log("users",users?.data);
  const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // second: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };

 
  return (
    <Box mt="96px" paddingBottom="10px" bg={{ md: "#fff" }}>
      {/* <CreateUser /> */}
      <Flex
        p={{ md: "25px" }}
        mb={{ base: "15px", md: "8px" }}
        justifyContent="space-between"
        align="center"
      >
         <Stack spacing={3}>
            <Text fontSize="22px" mb="4px" fontWeight="700" lineHeight="100%">
            User Table
          </Text>
         
          <Box boxShadow="sm">
            <Input htmlSize={12} width="auto" placeholder="Search...." defaultValue={userSearch} onChange={handleUserChange} />
             {/* <Text fontSize="16px" mb="4px" fontWeight="700" lineHeight="100%">
            Total{users.data.total_count}
          </Text> */}
          </Box>
        </Stack>
      
       
        <HStack spacing={3}>
          <Button
            minW="100px"
            bg={trashList ? "#332941" : "red"}
            // _hover={{
            //   background: "#01011",
            // }}
            color="#fff"
           isDisabled={isFetching}
          //  isLoading={isLoading || isFetching}
            onClick={handleTrashList}
          >
           {trashList ? "  Back" : " Trash List"}
          </Button>
          <Button
    bg= "#000"
  // _hover={{
  //   background:  : "#01011",
  // }}
  color="#fff"
  // isLoading={isLoading || isFetching}
  isDisabled={isFetching}
>
  <Link href="/dashboard/user/create">
    {( isLoading || isFetching)  ? "loading..." : "Create User"}
  </Link>
</Button>
        </HStack>
      </Flex>

      {/* component */}
      <section className="container  mx-auto  rounded-md  sm:px-5 lg:px-3">
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 bg-[#fff] md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-[#fff]">
                  <thead className="bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-md font-medium text-left rtl:text-right text-gray-500 "
                      >
                        <div className="flex items-center gap-x-3">
                          <button className="flex items-center gap-x-2">
                        UserId
                          </button>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-md font-medium text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-md font-medium text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-md font-medium text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        PhoneNumber
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-md font-medium text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-md font-medium text-left rtl:text-right text-gray-500  "
                      >
                        <p className="ml-8">Date& Time</p>
                      </th>
                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only text-[#000]">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {isFetching && (
                      <tr>
                        <td colSpan={6} className="text-center py-4 ">
                          <div className="flex justify-center items-center">
                            <PulseLoader color="#000" size={20} />
                          </div>
                        </td>
                      </tr>
                    )}
                    {isError && (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-4 text-red-500"
                        >
                          Error loading data. Please try again.
                        </td>
                      </tr>
                    )}

                    {!isFetching &&
                      !isError &&
                     users?.data?.users.filter((item:string) => item.name.toLowerCase().includes(String(userSearch).toLowerCase())).map((list: userType) => (
                        // console.log(list);
                        <tr key={list.id}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700  whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <p>#{list.id}</p>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {/* <Image src={list?.image || list?.name} alt={list.name && list.email} width={100} height={100}  /> */}
                            <h2 className="text-sm font-bold">{list?.name}</h2>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            <div className="flex items-center gap-x-2">
                              <h2 className="text-md font-medium text-gray-800">
                                {list?.email}
                              </h2>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {list?.phone}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {list?.role}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {list?.created_at
                              ? formatDateString(list?.created_at)
                              : "No Date Available"}
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            {trashList ? (
                              <div className="flex items-center gap-x-8">
                              
                                  <button onClick={() =>handleRestoreUser(list.id)}>
                                     <FaTrashRestore size={20} />
                                  </button>
                                 

                                <button className="text-red-600 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none" onClick={() =>handleForceDeleteUser(list.id)} >
                                    <IoTrashBin size={18} />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-x-8">
                                <Link
                                  href={`/dashboard/user/edit/${list.id}`}
                                  className=" transition-colors duration-200 text-emerald-500  focus:outline-none"
                                >
                                  <FaRegEdit size={20} />
                                </Link>

                                <button className="text-red-600 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none" onClick={() =>handleDeleteUser(list.id)}>
           
          <FaRegTrashAlt size={18} />
                                  
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <a
            href="#"
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-black text-white border rounded-md gap-x-2 hover:bg-gray-100 bg-gray-900 dark:text-gray-200 bg-[#fff] dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            <span>previous</span>
          </a>
          <div className="items-center hidden md:flex gap-x-3">
            <a
              href="#"
              className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
            >
              1
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              2
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              3
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              ...
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              12
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              13
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              14
            </a>
          </div>
          <a
            href="#"
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-black text-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 bg-[#fff] dark:hover:bg-gray-800"
          >
            <span>Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </div>
      </section>
    </Box>
  );
}
