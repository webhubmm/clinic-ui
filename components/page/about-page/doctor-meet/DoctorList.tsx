import { Box, Container, Heading, Text } from "@chakra-ui/react";
import docImgOne from "@/public/assets/doctorOne_team ca.png";
import docImgTwo from "@/public/assets/doctor_two_team ca.png";
import docImgThree from "@/public/assets/doctor_three_team ca.png";
import docImgFour from "@/public/assets/doctor_four_team ca.png";
import Image from "next/image";
import DoctorCard from "./DoctorCard";
const doctorList = [
  {
    id: 23,
    name: "Jessie Kulas",
    img: docImgOne,
    skill: "Pediatric Dentist",
  },
  {
    id: 24,
    name: "Patricia Wolfgang",
    img: docImgTwo,
    skill: "Maxillofacial Surgeon",
  },
  {
    id: 25,
    name: "Timothy Northcutt",
    img: docImgThree,
    skill: "Root Canel Expert",
  },
  {
    id: 26,
    name: "Darlene Clawson",
    img: docImgFour,
    skill: "Maxillofacial Surgeon",
  },
];
export default function DoctorList() {
  return (
    <Box bg="white" paddingY="6rem">
      <Container maxW="container.xl">
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          gap="5"
        >
          <Text color="neat.primary" fontWeight="600">
            Our team
          </Text>
          <Heading color="neat.secondary">Meet our dentists</Heading>
        </Box>
        <Box display='flex' justifyContent='space-between' gap='8'>
            {
              doctorList?.map((item,index) =>(
                <DoctorCard item={item} key={item.id+index}/>
              ))
            }
        </Box>

      </Container>
    </Box>
  );
}
