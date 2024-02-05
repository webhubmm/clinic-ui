import { Box, Card ,CardHeader,Heading, Text} from "@chakra-ui/react";
import Image from "next/image";
import blogImg from '@/public/assets/blogOne_image13.png';
import { FaArrowRight } from "react-icons/fa6";

interface blogProps {
   blogImg:string,
        title:string,
}
export default function HomeBlogCard({item}:{
item:blogProps
}) {
  return (
    <Card width='380px' borderRadius='10px'>
      <Box >
        <Image src={item.blogImg}   alt="blogs app" width={380} height={380}  />

      </Box>
      <CardHeader maxW='sm'>
        <Heading size='md' color='neat.secondary' fontSize='1.5rem'>
          {item?.title}
          </Heading>
     <Text  display='flex' marginTop='20px' justifyItems='center' alignItems='center' gap="5" cursor='pointer'>
       <Text as='span' color='neat.primary' >
        <FaArrowRight />
       </Text>
       <Text as='span' color='neat.secondary'>
        Read More
       </Text>
     </Text>
  </CardHeader>
    </Card>
  )
}
