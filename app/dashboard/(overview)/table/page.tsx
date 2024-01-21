import CheckTable from "@/components/admin/checkTable/CheckTable";
import { Grid, GridItem, Flex, Text, HStack, Center } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

export default function Table() {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        sm: "1fr",
        md: "1fr",
        lg: "repeat(2, 1fr)",
        xl: "repeat(2, 1fr)",
      }}
      marginTop='96px'
      gap={{ base: 3, md: 4 }}
    >
      {[...Array(4)].map((_, index) => (
        <GridItem key={index}>
          <Flex
            direction="column"
            bg="#fff"
            overflowX={{ md: "visible" }}
            w="100%"
            h="100%"
          >
            <Flex p="25px" mb="8px" justifyContent="space-between" align="center">
              <Text fontSize="22px" mb="4px" fontWeight="700" lineHeight="100%">
                Complex Table
              </Text>
              <HStack>
                <Center height="40px" bg="#f4f7fe" p="10px" borderRadius="10px">
                  <BsThreeDots size={20} />
                </Center>
              </HStack>
            </Flex>
            <CheckTable />
          </Flex>
        </GridItem>
      ))}
    </Grid>
  );
}
