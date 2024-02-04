import { Box, Container, Heading, Text } from "@chakra-ui/react";
import Image from 'next/image';
import messageDoctor from '@/public/assets/message_Team Em.png';
interface DoctorProps {
  name: string;
    img: string;
    skill:  string;
}
export default function DoctorCard({item}:{
  item:DoctorProps
}) {
  return (
    <Box marginTop='3rem'>
       <Box position='relative' marginBottom='3rem'>
              <Image src={item?.img} alt={`${item?.name} ${item.skill}`} width={300} height={300}/>
               <Box position='absolute' bottom='-6' left='40%'>
                <Image src={messageDoctor} alt="message for doctor" width={50} height={50}/>
              </Box>
           </Box>

            <Box display='flex' flexDir='column' alignItems='center' gap='3'>
              <Text fontSize='20px' fontWeight={600} color='neat.secondary'>
               {item?.name}

              </Text>
              <Text as='span'>
                {item?.skill}

                </Text>

            </Box>
    </Box>
  );
}
