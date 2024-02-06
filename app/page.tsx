import { Box, Container } from "@chakra-ui/react";
import NavBar from "@/components/common/navbar/NavBar";
import Hero from "@/components/page/user-home-page/hero/Hero";
import BookAppointment from "@/components/page/user-home-page/book-appointment/BookAppointment";
import HomeDentalServices from "@/components/page/user-home-page/homeDental/HomeDentalServices";
import HomeDentalProvide from "@/components/page/user-home-page/home-dental-provide/HomeDentalProvide";
import HomeOnlineServices from "@/components/page/user-home-page/online-home-services/HomeOnlineServices";
import HomeReview from "@/components/page/user-home-page/home-review/HomeReview";
import HomeOurService from "@/components/page/user-home-page/home-our-service/HomeOurService";
import HomeBlogShow from "@/components/page/user-home-page/blog-show/HomeBlogShow";

export default function Home() {
  return (
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
  );
}
