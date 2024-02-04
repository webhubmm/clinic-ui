import { Text, Box, Container, Heading, Stack, Flex } from "@chakra-ui/react";
import Image from "next/image";
import clinicImg from "@/public/assets/clinirooms_our cli.png";
import { FaCircleCheck } from "react-icons/fa6";

export default function AboutClinicRooms() {
  return (
    <Box bg="neat.pearlwhite" paddingY="6rem">
      <Container maxW="container.xl">
        <Box position="relative">
          <Box
            display="flex"
            gap="3"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Box position="relative">
              <Image
                src={clinicImg}
                alt="care dental image"
                width={500}
                height={300}
              />
            </Box>
            <Stack maxW="lg" spacing={8}>
              <Text color="neat.primary" fontWeight="600">
                Our clinics
              </Text>
              <Heading color="neat.secondary">
                Transform your smile at our dental clinic
              </Heading>
              <Text
                color="slate"
                fontSize="18px"
                fontWeight="600"
                lineHeight={2}
              >
                At our dental care service, we strive to provide the best
                possible care for our patients. Here are some reasons why you
                should choose our service:
              </Text>
              <Box display="flex" gap="10">
                <Stack spacing={5}>
                  <Flex gap="5" alignItems="center">
                    <Box color="neat.primary">
                      <FaCircleCheck size={20} />
                    </Box>
                    <Text as="span" color="gray_opacity" fontWeight="500">
                      Quality Care
                    </Text>
                  </Flex>
                  <Flex gap="5" alignItems="center">
                    <Box color="neat.primary">
                      <FaCircleCheck size={20} />
                    </Box>
                    <Text as="span" color="gray_opacity" fontWeight="500">
                      Experienced Team
                    </Text>
                  </Flex>
                  <Flex gap="5" alignItems="center">
                    <Box color="neat.primary">
                      <FaCircleCheck size={20} />
                    </Box>
                    <Text as="span" color="gray_opacity" fontWeight="500">
                      Comprehensive Services
                    </Text>
                  </Flex>
                </Stack>
                <Stack spacing={5}>
                  <Flex gap="5" alignItems="center">
                    <Box color="neat.primary">
                      <FaCircleCheck size={20} />
                    </Box>
                    <Text as="span" color="gray_opacity" fontWeight="500">
                      State-of-the-art Technology
                    </Text>
                  </Flex>
                  <Flex gap="5" alignItems="center">
                    <Box color="neat.primary">
                      <FaCircleCheck size={20} />
                    </Box>
                    <Text as="span" color="gray_opacity" fontWeight="500">
                      Comfortable Environment
                    </Text>
                  </Flex>
                  <Flex gap="5" alignItems="center">
                    <Box color="neat.primary">
                      <FaCircleCheck size={20} />
                    </Box>
                    <Text as="span" color="gray_opacity" fontWeight="500">
                      Commitment to Excellence
                    </Text>
                  </Flex>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
