import { Box, Container, Heading, Text } from "@chakra-ui/react";

import ContainerBox from "@/components/common/container/Container";
import DoctorCaurosel from "./DoctorCaurosel";

export default function DoctorList() {
  return (
    <Box bg="brands.logInTextColor" paddingY="6rem">
      {/* <Container maxW="container.xl"> */}
      <ContainerBox>
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
       
        <DoctorCaurosel />
</ContainerBox>
      {/* </Container> */}
    </Box>
  );
}
