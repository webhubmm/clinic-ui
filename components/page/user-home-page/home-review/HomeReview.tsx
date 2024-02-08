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

    }
]
export default function HomeReview() {
  return (
     <Box paddingTop='6rem' paddingBottom='16rem' bg='neat.pearlwhite'>
        <ContainerBox>
         <Box display='flex' flexDir='column'  gap='5' justifyContent='center' alignItems='center'>
           <Text color='neat.primary' fontWeight='600'>
            Our customers

           </Text>
           <Heading color='neat.secondary'>
            Our happy patient says


            </Heading>
         </Box>
          <Box display={{sm:'grid',lg:'flex'}} justifyContent={{sm:'center',lg:'space-between'}} gap={{sm:'20',lg:'8'}} marginTop='4rem'>
            


                {
                    reviewList?.map((item,index) =>(
                        <ReviewCard key={item.id+index} item={item}/>
                    ))
                }
                
          </Box>
          </ContainerBox>
         {/* </Container> */}
     </Box>
  )
}