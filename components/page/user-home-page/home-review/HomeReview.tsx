
import { Box, Container,Text,Heading, Card,Stack } from "@chakra-ui/react";
import reviewOne from '@/public/assets/reviewone.png';
import reviewTwo from '@/public/assets/reviewTwo.png';
import reviewThree from '@/public/assets/reviewThree.png';
import Image from "next/image";
import revieImgOne from '@/public/assets/revireimg.png';
import revieImgTwo from '@/public/assets/revieauth.png';
import revieImgThree from '@/public/assets/reviewAuthThree.png';
import ReviewCard from "./ReviewCard";
import ContainerBox from "@/components/common/container/Container";
    // import styles from "../styles/Elastic.module.css";
 import HomeCaurosel from "./HomeCaurosel"   


const reviewList =[
    {
        id:30,
        imagesH:reviewOne,
        title:'Oral cavity treatment',
        desc:'“I had a dental emergency called here, and they were able to see me right away”.',
        img:revieImgOne,
        name:"Emma Wilson",
        city:'Los Angeles'

    },
    {
        id:40,
        imagesH:reviewTwo,
        title:'Root canal treatment',
        desc:'“I highly recommend this practice to anyone looking for great dental care."',
        img:revieImgTwo,
        name:"William Johnson",
        city:'Houston'

    },
     {
        id:50,
        imagesH:reviewThree,
        title:'Oral cavity treatment',
        desc:'“I highly recommend this practice to anyone looking for great dental care."',
        img:revieImgThree,
        name:"Emma Wilson",
        city:'Los Angeles'

    },
     {
        id:60,
        imagesH:reviewOne,
        title:'Oral cavity treatment',
        desc:'“I had a dental emergency called here, and they were able to see me right away”.',
        img:revieImgOne,
        name:"Emma Wilson",
        city:'Los Angeles'

    },
    {
        id:80,
        imagesH:reviewTwo,
        title:'Root canal treatment',
        desc:'“I highly recommend this practice to anyone looking for great dental care."',
        img:revieImgTwo,
        name:"William Johnson",
        city:'Houston'

    },
     {
        id:90,
        imagesH:reviewThree,
        title:'Oral cavity treatment',
        desc:'“I highly recommend this practice to anyone looking for great dental care."',
        img:revieImgThree,
        name:"Emma Wilson",
        city:'Los Angeles'

    }
]
export default function HomeReview() {
    // paddingBottom='16rem'
  return (
     <Box paddingTop='6rem'  bg='neat.pearlwhite'>
        <ContainerBox>
         <Box display='flex' flexDir='column'  gap='5' justifyContent='center' alignItems='center'>
           <Text color='neat.primary' fontWeight='600'>
            Our customers

           </Text>
           <Heading color='neat.secondary' fontSize={{sm:'2rem',md:'auto'}}>
            Our happy patient says


            </Heading>
         </Box>
         
          <HomeCaurosel />
          </ContainerBox>
         {/* </Container> */}
     </Box>
  )
}