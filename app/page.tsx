"use client";
import { Box, Container } from "@chakra-ui/react";
import Hero from "@/components/page/user-home-page/hero/Hero";
import BookAppointment from "@/components/page/user-home-page/book-appointment/BookAppointment";
import HomeDentalServices from "@/components/page/user-home-page/homeDental/HomeDentalServices";
import HomeDentalProvide from "@/components/page/user-home-page/home-dental-provide/HomeDentalProvide";
import HomeOnlineServices from "@/components/page/user-home-page/online-home-services/HomeOnlineServices";
import HomeReview from "@/components/page/user-home-page/home-review/HomeReview";
import HomeOurService from "@/components/page/user-home-page/home-our-service/HomeOurService";
import HomeBlogShow from "@/components/page/user-home-page/blog-show/HomeBlogShow";
import { useAppSelector } from "@/store/hooks";
import Loading from "@/components/Custom/Loading";

export default function Home() {
  // const { isFetchLoading } = useAppSelector((state) => state.globalSlice);

  return (
    <Box>
      <Box>
        <Hero />
        <BookAppointment />
        <HomeDentalServices />
        <HomeDentalProvide />
        <HomeOnlineServices />
        <HomeReview />
        <HomeOurService />
        <HomeBlogShow />
      </Box>
    </Box>
  );
}
