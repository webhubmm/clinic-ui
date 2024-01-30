"use client";
import {
  Flex,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import { FaRegTrashAlt, FaRegEdit, FaTrashRestore } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { UserList } from "@/services/queries";
import { userType } from "@/types/userType";
import PulseLoader from "react-spinners/PulseLoader";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  setUserPage, setUserSearch ,setUserTrashList} from "@/services/feature/dashboardUserSlice";
import { useDeleteUser, usePermentDeleteUser, useRestoreUser } from "@/services/mutations";
import Swal from "sweetalert2";

interface RootState {
  dashboardData: {
    userList: userType; // Adjust the type accordingly
  };
}


export default function UserManagement() {
  // const [trashList, setTrashList] = useState(false);
  const dispatch = useDispatch();
  // Redux state - getting user data
  const userData = useSelector(
    (state: RootState) => state.dashboardData.userList
  );
 
  const trash =useSelector((state:any) => state?.dashboardData.trash)

  const page =useSelector((state:any) => state?.dashboardData.page)

  // for search user
 const search =useSelector( (state:any) => state?.dashboardData.search
 )

//  for page count
 const per_page=useSelector((state:any) => state?.dashboardSlice?.per_page);

 const  {data:users,isLoading,isFetching,isError,isPreviousData,isSuccess
 } = UserList({page,per_page,trash,search}) 
//  console.log("userData", users);

  // delete
  const deleteUserMutation =useDeleteUser();
  const restoreUserMutation=useRestoreUser();
  const forceUserMutation =usePermentDeleteUser();

  // user search
 const handleUserChange =(e: React.ChangeEvent<HTMLInputElement>) =>{
   return dispatch(setUserSearch(e.target.value))
 }

  const handleTrashList = () => {
    dispatch(setUserTrashList(!trash));
  };

  //  handle delete user
  const handleDeleteUser =(id:number) =>{
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
  const handleSureDeleteUser =(id:number) =>{
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

  // const pageCount = Math.ceil(totalItems / pageSize);  
 
  return (
    <Box mt="96px" paddingBottom="10px" bg={{ md: "#fff" }}>
      <Flex
        p={{ md: "25px" }}
        mb={{ base: "15px", md: "8px" }}
        justifyContent="space-between"
        align="center"
      >
         <div  className='space-y-3'>
            <Text fontSize="22px" mb="4px" fontWeight="700" lineHeight="100%">
            User Table
          </Text>
         
          <Box boxShadow="sm">
            <Input  minWidth='100px' placeholder="Search...." defaultValue={search} onChange={handleUserChange} />
            
          </Box>
        </div>
       
        <div    className=" md:flex gap-3  justify-center items-center ">
          <Button
            // minW="100px"
            bg={trash ? "#332941" : "red"}
           marginY={{base:'5px',md:"0pxx"}}
            color="#fff"
           isDisabled={isFetching}
            onClick={handleTrashList}
          >
           {trash ? "  Back" : " Trash List"}
          </Button>
  <Link href="/dashboard/user/create">

          <Button
    bg= "#000"
 
  color="#fff"
  isDisabled={isFetching}
>
     Create User
</Button>
  </Link>

        </div>
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
                        UserId
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
                        <p className="sr-only text-[#000]">Actions</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {isLoading && (
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
                     
                    {!isLoading &&
                      !isError &&
                     users?.data?.users?.filter((item:string) => item.name.toLowerCase().includes(String(search).toLowerCase())).map((list: userType) => (
                        // console.log(list);
                        <tr key={list.id}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700  whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <p>{list.id}</p>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
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
                            {trash ? (
                              <div className="flex items-center gap-x-8">
                              
                                  <button onClick={() =>handleRestoreUser(list.id)}>
                                     <FaTrashRestore size={20} />
                                  </button>
                                 

                                <button className="text-red-600 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none" onClick={() =>handleSureDeleteUser(list.id)} >
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
                             {/* <div className="flex items-center gap-x-8">
                                <Link
                                  href={`/dashboard/user/edit/${list.id}`}
                                  className=" transition-colors duration-200 text-emerald-500  focus:outline-none"
                                >
                                  <FaRegEdit size={20} />
                                </Link>

                                <button className="text-red-600 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none" onClick={() =>handleDeleteUser(list.id)}>
           
                                 <FaRegTrashAlt size={18} />
                                  
                                </button>
                              </div> */}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
 {
  isSuccess ? (
          <div className=" flex justify-between my-3">
      <button
        disabled={page === 1 || isPreviousData}
        onClick={() =>dispatch(setUserPage(page-1))}
        // onClick={() =>setPage(page-1)}
        className=" px-3 py-2 bg-black text-white rounded-lg"
      >
        « Previous
      </button>
      <button className="px-2 py-2">Page {page}</button>
      <button
        disabled={page === Math.ceil(users?.data?.total_count / per_page )    || isPreviousData}
        onClick={() =>dispatch(setUserPage(page+1))}
        // onClick={() =>setPage(page+1)}
         
        className=" px-3 py-2 bg-black text-white rounded-lg"
      >
        Next »
      </button>
    </div>
  ):(
         <></>
  )
 }
      
      </section>
    </Box>
  );
}
