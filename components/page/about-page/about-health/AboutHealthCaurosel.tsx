"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Box, Card, Container, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import healthImgOne from "@/public/assets/about_health.png";
import healthImgTwo from "@/public/assets/about_health_dental.png";
import HealthCard from "./HealthCard";
import ContainerBox from "@/components/common/container/Container";

const healthLsit = [
  {
    id: 1,
    title: "Good dental care is healthy mouth",
    img: healthImgOne,
    desc: "Key points to keep in mind for maintaining good dental care",
    listOne: "Brush twice a day",
    listTwo: "Floss daily",
    listThree: "Don't use tobacco",
  },
  {
    id: 2,
    title: "Top foods to keep your teeth healthy",
    img: healthImgTwo,
    desc: "Our team has years of experience providing high-quality dental care.",
    listOne: "Dairy products",
    listTwo: "Fruits and vegetables",
    listThree: "Nuts and seeds",
  },
  {
    id: 3,
    title: "Good dental care is healthy mouth",
    img: healthImgOne,
    desc: "Key points to keep in mind for maintaining good dental care",
    listOne: "Brush twice a day",
    listTwo: "Floss daily",
    listThree: "Don't use tobacco",
  },
  {
    id: 4,
    title: "Top foods to keep your teeth healthy",
    img: healthImgTwo,
    desc: "Our team has years of experience providing high-quality dental care.",
    listOne: "Dairy products",
    listTwo: "Fruits and vegetables",
    listThree: "Nuts and seeds",
  },
];
// flexDir={{sm:'column',lg:'row'}} gap={{sm:'5',lg:'10'}}
export default function AboutHealthCaurosel() {
  return (
    <Box
      marginTop="2rem"
      display={{ sm: "grid", lg: "flex" }}
      justifyContent={{ sm: "center", lg: "space-between" }}
      gap={{ sm: "20", lg: "8" }}
      alignItems="center"
      minH={{ sm: "80vh", md: "50vh", lg: "80vh" }}
    >
      <Swiper
        autoHeight={true}
        slidesPerView={2}
        spaceBetween={25}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        onSwiper={() => {}}
        className="h-96 w-full rounded-lg"
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
            slidesPerView: 1,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
        }}
      >
        {healthLsit?.map((list, index) => (
          <SwiperSlide key={list?.id + index}>
            <HealthCard list={list} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
