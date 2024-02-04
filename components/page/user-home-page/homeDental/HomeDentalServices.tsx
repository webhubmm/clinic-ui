import { Box, Heading, Container, Text, Card } from "@chakra-ui/react";
import Image from "next/image";
import imageOne from "@/public/assets/homeOne.png";
import ButtonPrimary from "@/components/common/button/ButtonPrimary";
import ButtonSecondary from "@/components/common/button/ButtonSecondary";
export default function HomeDentalServices() {
  return (
    <Box bg="brands.logInBgColor" paddingY="8rem">
      <Container maxW="container.xl">
        <Box display="flex" alignContent="center" justifyContent="space-around">
          <Box maxW="lg" display="grid" gap="6">
            <Text color="neat.primary" fontWeight="600">
              Introduction
            </Text>

            <Heading color="neat.secondary">
              Trusted dental services for you and your family.
            </Heading>
            <Text color="slate" fontSize="lg" lineHeight={2} fontWeight="600">
              At our dental practice, we offer a comprehensive range of dental
              services to help you achieve optimal oral health and a beautiful
              smile. Our team of experienced and friendly dental professionals
              is committed to providing care in a comfortable.
            </Text>
            <Box display="flex" gap={5}>
              <ButtonSecondary placeholder="Learn More"></ButtonSecondary>
              <ButtonPrimary placeholder="Meet Doctors"></ButtonPrimary>
            </Box>
          </Box>

          <Box position="relative">
            <Image src={imageOne} alt="image name" width={600} height={600} />
            <Card
              padding="20px"
              display="grid"
              justifyContent="center"
              alignItems="center"
              position="absolute"
              top="20"
              left="10"
              maxW="200px"
              height="200px"
              borderRadius="10px"
            >
              <Text color="slate" fontWeight="500">
                We are dedicated to providing the highest quality of dental care
              </Text>
              <Text>Richard Williams</Text>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
