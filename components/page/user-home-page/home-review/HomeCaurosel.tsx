'use client'



import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Box, Container,Text,Heading, Card,Stack } from "@chakra-ui/react";
import reviewOne from '@/public/assets/reviewone.png';
import reviewTwo from '@/public/assets/reviewTwo.png';
import reviewThree from '@/public/assets/reviewThree.png';
import Image from "next/image";
import revieImgOne from '@/public/assets/revireimg.png';
import revieImgTwo from '@/public/assets/revieauth.png';
import revieImgThree from '@/public/assets/reviewAuthThree.png';
import ReviewCard from "./ReviewCard";
const reviewList =[
    {
        id:30,
        imagesH:reviewOne,
        title:'Oral cavity treatment',
        desc:'“I had a dental emergency called here, and they were able to see me right away”.',
        img:revieImgOne,
        name:"Emma Wilson",
        city:'Los Angeles'

    },
    {
        id:40,
        imagesH:reviewTwo,
        title:'Root canal treatment',
        desc:'“I highly recommend this practice to anyone looking for great dental care."',
        img:revieImgTwo,
        name:"William Johnson",
        city:'Houston'

    },
     {
        id:50,
        imagesH:reviewThree,
        title:'Oral cavity treatment',
        desc:'“I highly recommend this practice to anyone looking for great dental care."',
        img:revieImgThree,
        name:"Emma Wilson",
        city:'Los Angeles'

    },
     {
        id:60,
        imagesH:reviewOne,
        title:'Oral cavity treatment',
        desc:'“I had a dental emergency called here, and they were able to see me right away”.',
        img:revieImgOne,
        name:"Emma Wilson",
        city:'Los Angeles'

    },
    {
        id:80,
        imagesH:reviewTwo,
        title:'Root canal treatment',
        desc:'“I highly recommend this practice to anyone looking for great dental care."',
        img:revieImgTwo,
        name:"William Johnson",
        city:'Houston'

    },
     {
        id:90,
        imagesH:reviewThree,
        title:'Oral cavity treatment',
        desc:'“I highly recommend this practice to anyone looking for great dental care."',
        img:revieImgThree,
        name:"Emma Wilson",
        city:'Los Angeles'

    }
]

export default function HomeCaurosel() {
  return (
   <Box display={{sm:'grid',lg:'flex'}} justifyContent={{sm:'center',lg:'space-between'}} gap={{sm:'20',lg:'8'}}  marginTop='4rem' minH={{sm:'70vh',md:'50vh',lg:'90vh'}}>
            

            <Swiper
            autoHeight={true}
         slidesPerView={3}
        spaceBetween={30}
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
          spaceBetween: 40
        },
         1200: {
          slidesPerView: 3,
          spaceBetween: 40
        }
      }}
        >
           
                {
                    reviewList?.map((item,index) =>(
                        <SwiperSlide key={item.id+index}>
                        <ReviewCard  item={item}/>
                        </SwiperSlide>

                    ))
                }
        </Swiper>
          </Box>
  )
}
