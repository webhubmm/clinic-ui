import { Box, Container,Text,Heading, Card,Stack } from "@chakra-ui/react";
import Image from "next/image";
import revieImgOne from '@/public/assets/revireimg.png';
interface reviewProps {
    title:string;
    imagesH:string;
        desc:string;
        img:string;
        name:string;
        city:string;
}
export default function ReviewCard({item}:{
    item:reviewProps
}) {
  return (
     <Box position='relative'>
<Image src={item?.imagesH} alt="reviewone name" width={400} height={300}/>
 <Card paddingX='2rem' paddingY='3rem' maxW='330px' borderRadius='15px' position='absolute' bottom='-40' left='8%'>
                   <Box display='flex' flexDir='column' justifyItems='center' gap='5' maxW='sm'>
                    <Text fontWeight='600' fontSize='25px' color='neat.secondary'>
                       {item?.title}

                    </Text>
                    <Text color='slate'>
                        “I had a dental emergency called here, and they were able to see me right away”.
                    </Text>
                    <Box display='flex'   alignItems='center' gap='5'>
                        <Image src={item?.img} alt="review img" width={50} height={50}/>
                        <Stack>
                            <Text color='neat.secondary' fontSize='20px' fontWeight='600'>
                               {item?.name}

                            </Text>
                            <Text>
                                {item?.city}

                            </Text>
                        </Stack>
                    </Box>
                   </Box>
                </Card>
                </Box>
  )
}
