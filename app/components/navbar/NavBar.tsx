import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";

export default function NavBar() {
  return (
    <Container maxW="container.xl">
      <Box paddingY="2em" bgColor="white" color="slate" border="1px">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading as="h1">Dentx</Heading>
          {/* <Spacer /> */}
          <HStack spacing="30px" fontWeight="600">
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
              <Text cursor="pointer" fontSize="20px">
                1800_749_800
              </Text>
            </HStack>
          </Box>
          <Box>
            <Button
              size="md"
              width="250px"
              height="60px"
              padding="15px 9px"
              colorScheme="white"
              bgColor="#05b9de"
              fontSize="18px"
              borderRadius="30px"
            >
              Book an Appointment
            </Button>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
}
