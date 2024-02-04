import { Box, Container } from "@chakra-ui/react";
import NavBar from "@/components/common/navbar/NavBar";
import Hero from "@/components/page/user-home-page/hero/Hero";
import BookAppointment from "@/components/page/user-home-page/book-appointment/BookAppointment";
import HomeDentalServices from "@/components/page/user-home-page/homeDental/HomeDentalServices";
import HomeDentalProvide from "@/components/page/user-home-page/home-dental-provide/HomeDentalProvide";
import HomeOnlineServices from "@/components/page/user-home-page/online-home-services/HomeOnlineServices";
import HomeReview from "@/components/page/user-home-page/home-review/HomeReview";

export default function Home() {
  return (
    <Box bg="neat.pearlwhite">
      <Hero />
      <BookAppointment />
      <HomeDentalServices />
      <HomeDentalProvide />
      <HomeOnlineServices />
      <HomeReview />
    </Box>
  );
}
