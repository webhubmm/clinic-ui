import {
  Box,
  Center,
  Container,
  Flex,
  Text,
  Heading,
  HStack,
  Button,
} from "@chakra-ui/react";
import HeroImg from "@/public/assets/asset 5.webp";
import Image from "next/image";
import dantxLogo from "@/public/assets/asset 6.svg";

export default function Hero() {
  return (
    <Box bgColor="#052e73">
      <Container paddingTop="50px" maxW="container.xl">
        <HStack spacing="20px">
          <Image
            src={HeroImg}
            alt="hreo img"
            width={1000}
            height={400}
            objectFit="cover"
          />
          <Box color="#fff">
            <Heading fontSize="5em">Trustworthy dental services</Heading>
            <Text fontSize="22px" marginY="70px" lineHeight="40px">
              Our dental clinic offers a range of services to help you achieve a
              healthy and beautiful smile.
            </Text>
            <Button
              size="md"
              width="180px"
              height="55px"
              padding="12px 25px"
              colorScheme="white"
              bgColor="#05b9de"
              fontSize="18px"
              borderRadius="30px"
            >
              Learn More
            </Button>
            <Box>
              <Image src={dantxLogo} alt="dantx logo" width={30} height={30} />
            </Box>
          </Box>
        </HStack>
      </Container>
    </Box>
  );
}
