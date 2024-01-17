'use client'
import {FaUserEdit } from "react-icons/fa";
import { useRouter} from  "next/navigation";
export default function EditUser() {
    const router =useRouter();
  return (
          <button className=" transition-colors duration-200 text-emerald-500  focus:outline-none" onClick={()=> router.push('/dashboard/user/edit')}>
                <FaUserEdit size={20}/>
          </button>
                       
  )
}
