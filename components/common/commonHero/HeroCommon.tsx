"use client";

import { Box, Text, Heading, Stack, Wrap } from "@chakra-ui/react";
import AboutImg from "@/public/assets/about_hero im.png";
import Image from "next/image";
import dantxLogo from "@/public/assets/asset 6.svg";
import ButtonPrimary from "@/components/common/button/ButtonPrimary";
interface HeroProps {
 title:string;
  description:string;
  placeholder:string;
}
export default function HeroCommon({title,description,placeholder}:HeroProps) {
  return (
          <Box  display='grid' gap='10'
           maxW={{sm:'md',lg:'lg'}}
           paddingTop={{sm:'3rem',md:'5rem',lg:'0px'}}
          
           >
            <Stack direction='column' spacing={{sm:5,lg:10}} color='brands.logInTextColor' 
            >
               <Box display='grid' gap='3' maxW={{sm:'xs',md:'lg'}}>
                <Heading fontSize={{sm:'40px',md:'50px'}} fontWeight='bold' >{title}</Heading>
              <Text fontSize='19px' fontWeight='500' lineHeight={2} >
               {description}
              </Text>
               </Box>
               <Box>
                <ButtonPrimary placeholder={placeholder} onClick={() => {}} />
                </Box>
            </Stack>
           
            
          </Box>
  );
};

