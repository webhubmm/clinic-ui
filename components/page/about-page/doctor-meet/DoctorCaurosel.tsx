'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import docImgOne from "@/public/assets/doctorOne_team ca.png";
import docImgTwo from "@/public/assets/doctor_two_team ca.png";
import docImgThree from "@/public/assets/doctor_three_team ca.png";
import docImgFour from "@/public/assets/doctor_four_team ca.png";
import Image from "next/image";
import DoctorCard from "./DoctorCard";
import ContainerBox from "@/components/common/container/Container";
const doctorList = [
  {
    id: 23,
    name: "Jessie Kulas",
    img: docImgOne,
    skill: "Pediatric Dentist",
  },
  {
    id: 24,
    name: "Patricia Wolfgang",
    img: docImgTwo,
    skill: "Maxillofacial Surgeon",
  },
  {
    id: 25,
    name: "Timothy Northcutt",
    img: docImgThree,
    skill: "Root Canel Expert",
  },
  {
    id: 26,
    name: "Darlene Clawson",
    img: docImgFour,
    skill: "Maxillofacial Surgeon",
  },
   {
    id: 27,
    name: "Jessie Kulas",
    img: docImgOne,
    skill: "Pediatric Dentist",
  },
  {
    id: 28,
    name: "Patricia Wolfgang",
    img: docImgTwo,
    skill: "Maxillofacial Surgeon",
  },
  {
    id: 29,
    name: "Timothy Northcutt",
    img: docImgThree,
    skill: "Root Canel Expert",
  },
  {
    id: 30,
    name: "Darlene Clawson",
    img: docImgFour,
    skill: "Maxillofacial Surgeon",
  },
];
export default function DoctorCaurosel() {
  return (
     <Box display={{sm:'grid',lg:'flex'}} gridTemplateColumns={{sm:'repeat(1fr)',md:'repeat(1,1fr)'}} justifyContent={{sm:'center',lg:'space-between'}} gap={{sm:'5',md:'8'}} minH={{sm:'80vh',md:'70vh',lg:'90vh'}}>
                <Swiper
            autoHeight={true}
         slidesPerView={2}
        spaceBetween={25}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
          onSwiper={swiper => console.log(swiper)}
          className='h-96 w-full rounded-lg'
          breakpoints={{
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          // spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 1,
          // spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 2,
          spaceBetween: 30
        },
         1200: {
          slidesPerView: 4,
          spaceBetween: 30
        }
      }}
        >
            {
              doctorList?.map((item,index) =>(
                <SwiperSlide key={item.id+index}>
                <DoctorCard item={item} />
                </SwiperSlide>
              ))
            }
            </Swiper>
        </Box>
  )
}
