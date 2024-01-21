import {
  Box,
  Grid,
  GridItem,
  Flex,
  Spacer,
  Circle,
  HStack,
  Text,
  Card,
  Center,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Checkbox,
  Progress,
  Td,
  TableContainer,
  Select,
} from "@chakra-ui/react";

export default function CheckTable() {
  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <TableContainer>
        <Table variant="simple" color="gray.500" borderRadius="20px">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Date</Th>
              <Th>Progress</Th>
            </Tr>
          </Thead>
          <Tbody fontWeight="bold">
            {[...Array(5)].map((_, index) => (
              <Tr key={index} w={{ base: "10px", md: "auto" }}>
                <Td>
                  <Flex align="center">
                    <Checkbox colorScheme="purple" me="10px" color="blue" />
                    <Text fontSize={{ base: "sm", md: "md" }} fontWeight="700">
                      Leo
                    </Text>
                  </Flex>
                </Td>
                <Td>Leo@gmail.com</Td>
                <Td fontSize={{ base: "sm", md: "md" }}>
                  {new Date().toLocaleDateString()}
                </Td>
                <Td>
                  <Progress
                    hasStripe
                    colorScheme="blue"
                    size={{ base: "sm", md: "md" }}
                    value={30}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
