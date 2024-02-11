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
     <Box position='relative'  width={{sm:'100%',md:'350px',lg:'400px'}}>
<Image src={item?.imagesH} alt="reviewone name"
  width="0"
             height="0"
             sizes="100vw"
            className="w-full h-auto"
/>

 <Card paddingX='2rem' paddingY={{sm:'1rem',md:'1rem',lg:'3rem'}} maxW={{sm:'85%',md:'300px',lg:'330px'}} borderRadius='15px' position='absolute' bottom={{sm:'-40',md:'-40',lg:'-40'}} left='8%'>
                   <Box display='flex' flexDir='column' justifyItems='center' gap='5' maxW='sm'>
                    <Text fontWeight='600' fontSize={{md:'25px'}} color='neat.secondary'>
                       {item?.title}

                    </Text>
                    <Text color='slate'>
                        “I had a dental emergency called here, and they were able to see me right away”.
                    </Text>
                    <Box display='flex'   alignItems='center' gap={{sm:'3',md:'5'}}>
                        <Image src={item?.img} alt="review img" width={50} height={50}/>
                        <Stack>
                            <Text color='neat.secondary' fontSize={{sm:'15px',md:'20px'}} fontWeight='600'>
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
