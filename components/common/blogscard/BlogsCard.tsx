import { Box, Card ,CardHeader,Heading, Text} from "@chakra-ui/react";
import Image from "next/image";
import blogImg from '@/public/assets/blogOne_image13.png';
import { FaArrowRight } from "react-icons/fa6";

interface blogProps {
   blogImg:string,
        title:string,
}
export default function BlogsCard({blogImg,title}:{
blogImg:string,
        title:string,
}) {
  return (
    <Card width={{sm:'auto',md:'330px',lg:'380px'}} borderRadius='10px'>
      <Box >
        <Image src={blogImg}   alt="blogs app" width={380} height={380}  />

      </Box>
      <CardHeader maxW='sm'>
        <Heading size='md' color='neat.secondary' fontSize='1.5rem'>
          {title}
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
