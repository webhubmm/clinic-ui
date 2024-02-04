"use client";

import { Box, Center, Container, Text, Heading, Stack, Wrap } from "@chakra-ui/react";
import HeroImg from "@/public/assets/asset 5.webp";
import Image from "next/image";
import dantxLogo from "@/public/assets/asset 6.svg";
import ButtonPrimary from "@/components/common/button/ButtonPrimary";
export default function Hero() {
  return (
      <Box overflow='hidden'>

    <Box 
     bgImage= "url('../assets/asset 37.webp')"
     bgPosition="center"
    bgRepeat="no-repeat"
   
    >
      <Container maxW='container.xl'>
        <Box 
        display='flex'
        flexDir={{sm:'column-reverse',lg:'row'}}
        justifyContent='space-between'
        gap='10'
        alignItems="center"
        // className="flex flex-col-reverse lg:flex-row justify-between gap-10 items-center"
        >
          <Box position='relative' height='700px'>
            <Image src={HeroImg} alt="hero img" objectFit="cover" width={800} height={200} sizes='50vw' />
            </Box>
          <Box  display='grid' gap='10'
          // className=" space-y-10 md:space-y-20"
          >
            <Stack direction='column' spacing='30px' color='brands.logInTextColor'
            className=" space-y-5 md:space-y-10 text-white"
            >
              <Heading fontSize='60px' fontWeight='bold' >Trustworthy dental services</Heading>
              <Text fontSize='20px' fontWeight='500' >
                Our dental clinic offers a range of services to help you achieve
                a healthy and beautiful smile.
              </Text>
               <Box>
                <ButtonPrimary placeholder="Learn More" onClick={() => {}} />
                </Box>
            </Stack>
            <Box  display='flex' gap='3' alignItems='center'
           
            >
              <Image src={dantxLogo} alt="dantx logo" width={40} height={40} />
              <Box display='flex' gap='1'
              //  className="flex gap-1 flex-wrap"
               >
                <Text color="neat.primary">Say goodbye</Text>
                <Text color='brands.logInTextColor'
                // as='span'
                >
                  to dental issues with our restoration services.
                </Text>
              </Box>
            </Box>
            
          </Box>
        </Box>
      </Container>
      </Box>
    </Box>
  );
};

{/* <Box display='flex'  
//            flexDir={{sm:'column-reverse',lg:'row'}}
//            gap='10'
//            alignItems='center'
//          >
       
//            <Image src={HeroImg} alt="hero img" width={800} height={400}    
              
//                />
//           <Box  
//           >
//             <Stack color='white' 
//             direction='column'
//             spacing={8}
//              >
//               <Heading fontSize="60px">Trustworthy dental services</Heading>
//               <Text fontSize='20px' fontWeight='500'>
//                 Our dental clinic offers a range of services to help you achieve
//                 a healthy and beautiful smile.
//               </Text>
//                <Box>
//                 <ButtonPrimary placeholder="Learn More" onClick={() => {}} />
//                 </Box>
//             </Stack>
//             <Box 
//           display="flex"
//           alignItems='center'
//           gap='3'
//           marginTop='20px'
        
//             // className="flex gap-3 items-center"
//             >
//               <Image src={dantxLogo} alt="dantx logo" width={40} height={40} />
//               <Box
//               display='flex' 
//                  gap='1'
//                  marginTop="10px"
//               // className="flex gap-1 flex-wrap"
//               >
//                 <Wrap>
//                 <Text color="neat.primary">Say goodbye</Text>
//                 <Text color="white">
//                   to dental issues with our restoration services.
//                 </Text>
//                 </Wrap>
//               </Box>
//             </Box>
//           </Box>
//         </Box>*/}