import HeroCommon from "@/components/common/commonHero/HeroCommon";
import { Box, Container } from "@chakra-ui/react";
import AboutHero from "@/components/page/about-page/abouHero/AboutHero";
import AboutShowCare from "@/components/page/about-page/about-show-care/AboutShowCare";
import AboutHealth from "@/components/page/about-page/about-health/AboutHealth";
import AboutShowAction from "@/components/page/about-page/about-show-action/AboutShowAction";
import AboutClinicRooms from "@/components/page/about-page/clinic-rooms/AboutClinicRooms";
import DoctorList from "@/components/page/about-page/doctor-meet/DoctorList";
import AboutTechnology from "@/components/page/about-page/about-technology/AboutTechnology";
export default function AboutPage() {
  return (
    <Box bg="neat.pearlwhite">
      <AboutHero />
      <AboutShowCare />
      <AboutHealth />
      <AboutShowAction />
      <AboutClinicRooms />
      <DoctorList />
      <AboutTechnology />
    </Box>
  );
}
