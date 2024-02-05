import ContactForm from "@/components/page/contact-page/ContactForm";
import { Box, Card, Container, Heading,Text } from "@chakra-ui/react";
import addressImg from '@/public/assets/address_locatio.png';
import phoneImg from '@/public/assets/phine_call-ic.png';
import clockImg from '@/public/assets/contact_clock-i.png';
import mapImg from "@/public/assets/map_pin-ico.png";
import ContactCard from "@/components/page/contact-page/ContactCard";
const cardList= [
    {
        id:60,
        img:addressImg,
        title:'Address',
        desc:'4066 Werninger Street, Houston, 55982 United States'
    },
     {
        id:70,
        img:phoneImg,
        title:'Contact',
        desc:'1800-749-8000 Email: info@domain.com'
    },
     {
        id:80,
        img:clockImg,
        title:'Working hours',
        desc:'Mon - Fri - 09.00 am - 06.00 pm Sat & Sun - Closed'
    },
     {
        id:90,
        img:mapImg,
        title:'Google map',
        desc:'Discover our prime location for best dental care. View map'
    },
]
export default function ContactPage() {
  return (
    <Box bg='neat.pearlwhite' paddingY='6rem'>
        <Container maxW='container.xl'>
         <Box display='grid' gap='5' minW='lg'>
            <Text color='neat.primary' fontSize='20px' fontWeight='600'>
                Contact us

            </Text>
            <Heading color='neat.secondary' fontSize='3.5rem'>
                We're here to help! Reach out for expert dental advice.

            </Heading>
         </Box>
          <Box>
             <ContactForm />
          </Box>
          <Card padding='2rem'>
            <Box display='flex'  justifyContent='space-between' gap='8'>
                 {
                    cardList?.map((item) =>(

                        <ContactCard item={item} key={item.id}/>
                    ))
                 }
            {/* <ContactCard />
            <ContactCard />
            <ContactCard /> */}
             
            </Box>
          </Card>
        </Container>
        </Box>
  )
}
