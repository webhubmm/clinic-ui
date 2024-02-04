import { Box, Container } from "@chakra-ui/react";
import NavBar from "@/components/common/navbar/NavBar";
import Hero from "@/components/page/user-home-page/hero/Hero";
import BookAppointment from "@/components/page/user-home-page/book-appointment/BookAppointment";

export default function Home() {
  return (
    <Box bg='neat.pearlwhite'>
      <Hero />
      <Box >
         <BookAppointment />
      </Box>
    </Box>
  );
}
