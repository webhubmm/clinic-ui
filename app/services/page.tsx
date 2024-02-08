import ServicesCare from "@/components/page/services-page/dental-care-services/ServicesCare";
import ServicesAction from "@/components/page/services-page/serverices-acton/ServicesAction";
import ServicesHero from "@/components/page/services-page/service-hero/SerivcieHero";
import ServicesQuestion from "@/components/page/services-page/services-question/ServicesQuestion";
import { Box, Container,Text ,List,ListItem,Circle} from "@chakra-ui/react";

export default function ServicesPage() {
  return (
    <Box>
        <ServicesHero />
        <ServicesCare />
        <ServicesAction />
        <ServicesQuestion />
    </Box>
  )
}
