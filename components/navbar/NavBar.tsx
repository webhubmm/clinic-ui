import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Spacer,
  Center,
  Text,
  Circle,
} from "@chakra-ui/react";
import { FaPhone } from "react-icons/fa6";
import dantxLogo from "@/public/assets/asset 6.svg";
import Image from "next/image";
export default function NavBar() {
  return (
    <Container maxW="container.xl">
      <Box paddingY="2em" bgColor="white" color="slate">
        <Flex alignItems="center" justifyContent="space-between">
          <HStack>
            <Image src={dantxLogo} alt="dantx logo" width={30} height={30} />
            <Heading as="h1">Dentex</Heading>
          </HStack>
          {/* <Spacer /> */}
          <HStack spacing="50px" fontWeight="600">
            <Text cursor="pointer" fontSize="20px">
              Home
            </Text>
            <Text cursor="pointer" fontSize="20px">
              About
            </Text>
            <Text cursor="pointer" fontSize="20px">
              Services
            </Text>
            <Text cursor="pointer" fontSize="20px">
              Blogs
            </Text>
            <Text cursor="pointer" fontSize="20px">
              Contacts
            </Text>
          </HStack>
          <Box>
            <HStack spacing="20px" fontWeight="600">
              <Circle size="40px" bg="#05b9de" color="white">
                <FaPhone size={14} />
              </Circle>
              <Text cursor="pointer" fontSize="20px">
                1800_749_800
              </Text>
            </HStack>
          </Box>
          <Box>
            <Button
              size="md"
              width="250px"
              height="52px"
              padding="12px 12px"
              colorScheme="white"
              bgColor="#05b9de"
              fontSize="18px"
              borderRadius="30px"
            >
              Book an Appointment
            </Button>

            <Box></Box>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
}
