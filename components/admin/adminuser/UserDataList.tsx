"use client";

import { useDeleteUser, usePermentDeleteUser, useRestoreUser } from "@/services/mutations";
import { FaRegTrashAlt, FaRegEdit, FaTrashRestore } from "react-icons/fa";
import { UserList } from "@/services/queries";
import PulseLoader from "react-spinners/PulseLoader";
import { IoTrashBin } from "react-icons/io5";

import Swal from "sweetalert2";

export default function UserDataList() {
   const restoreUserMutation=useRestoreUser();
  const forceUserMutation =usePermentDeleteUser();
    //  handle force delete user
     const  {data:users,isLoading,isFetching,isError,isPreviousData,isSuccess
 } = UserList(page ,pageSize) 
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
                     users?.data?.users?.filter((item:string) => item.name.toLowerCase().includes(String(userSearch).toLowerCase())).map((list: userType) => (
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
                            
                              <div className="flex items-center gap-x-8">
                              
                                  <button onClick={() =>handleRestoreUser(list.id)}>
                                     <FaTrashRestore size={20} />
                                  </button>
                                 

                                <button className="text-red-600 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none" onClick={() =>handleSureDeleteUser(list.id)} >
                                    <IoTrashBin size={18} />
                                </button>
                              </div>
                        
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
  )
}
