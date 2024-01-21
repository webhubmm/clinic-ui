'use client';
import CreateUser from "@/components/admin/adminuser/CreateUser";
import { Card,Flex,Text,Button,Box } from "@chakra-ui/react";
import { FaRegTrashAlt,FaUserEdit } from "react-icons/fa";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/api";
import {UserList } from "@/services/queries"
import { userType } from "@/types/userType";
import PulseLoader from "react-spinners/PulseLoader";

export default function  UserManagment() {

 const  {data:users,isPending,isError} =UserList() as { data: userType, isPending: boolean, isError: any };;

  


  // console.log("users",users?.data);
   const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleString('en-US', options);
  };
  return (
    <Box mt='96px' paddingBottom='10px' bg={{md:"#fff"}}>
     <CreateUser />
     
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
                        <span>UserId</span>
                        
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
                    <p className="ml-8">

                    Date& Time
                      </p>
                  </th>
                  <th scope="col" className="relative py-3.5 px-4">
                    <span className="sr-only text-[#000]">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {isPending && (
                      <tr>
                        <td colSpan={6} className="text-center py-4 ">
                          <div className='flex justify-center items-center'>

                          <PulseLoader color="#000" size={20}/>
                          </div>
                        </td>
                      </tr>
                    )}
                    {isError && (
                      <tr>
                        <td colSpan={6} className="text-center py-4 text-red-500">
                          Error loading data. Please try again.
                        </td>
                      </tr>
                    )}

               {!isPending && !isError && users?.data?.users?.map((list:userType) =>(
                    // console.log(list);
                  <tr key={list.id}>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700  whitespace-nowrap">
                    <div className="inline-flex items-center gap-x-3">
                     
                      <span>#{list.id}</span>
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
                   {list?.created_at ? formatDateString(list?.created_at) : 'No Date Available'}
                  </td>
                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-x-8">
                 <Link  href='/dashboard/user/edit' className=" transition-colors duration-200 text-emerald-500  focus:outline-none" >
                <FaUserEdit size={20}/>
                </Link>
                      <button className="text-red-600 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                       <FaRegTrashAlt size={18}/>
                      </button>
                     
                    </div>
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
  )
}
