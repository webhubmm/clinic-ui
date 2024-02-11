import FormCommon from "@/components/common/form/FormCommon";
import { Box, Card } from "@chakra-ui/react";
import heroImg from "@/public/assets/contactForm.png";
import Image from 'next/image';
export default function ContactForm() {
  return (
    <Box bg='#fff' marginY='4rem'>
        <Card  borderRadius='20px'>
           <Box display='flex' flexDir={{sm:'column',lg:'row'}}>
             <Box position='relative'>
                <Image src={heroImg}  alt='hero img name' width={600} height={800}/>
             </Box>
             <Box padding={{sm:'1rem',md:'4rem'}}>
                <FormCommon />
             </Box>
             
           </Box>
        </Card>
    </Box>
  )
}
