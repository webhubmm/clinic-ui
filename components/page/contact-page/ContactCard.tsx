import { Box ,Text,Stack} from "@chakra-ui/react";
import Image from "next/image";
import addressImg from '@/public/assets/address_locatio.png';

interface cardProps {
    img:string;
        title:string;
        desc:string
}

export default function ContactCard({item}:{
    item:cardProps
}) {
  return (
    <Box display='grid' gap='8'>
        <Image src={item.img} alt="" width={60} height={60}/>
        <Stack maxW='xs' spacing={3}>
            <Text color='neat.secondary' fontSize='20px' fontWeight='500'>
               {item?.title}
            </Text>
            <Text color='slate' >
              {item?.desc}
 
            </Text>

        </Stack>
    </Box>
  )
}
