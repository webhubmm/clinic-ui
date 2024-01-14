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
          <Th>Date </Th>
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
  {/* <table className="w-full h-fit text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
           User Name
        </th>
        <th scope="col" className="px-6 py-3">
          <div className="flex items-center">
            Email

          </div>
        </th>
        <th scope="col" className="px-6 py-3">
          <div className="flex items-center">
            Date
            
          </div>
        </th>
        <th scope="col" className="px-6 py-3">
          <div className="flex items-center">
            Price
            <a href="#">
              <svg
                className="w-3 h-3 ms-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
              </svg>
            </a>
          </div>
        </th>
        <th scope="col" className="px-6 py-3">
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-[#fff] border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
        >
          Apple MacBook Pro 17"
        </th>
        <td className="px-6 py-4">Silver</td>
        <td className="px-6 py-4">Laptop</td>
        <td className="px-6 py-4">$2999</td>
        <td className="px-6 py-4 text-right">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </a>
        </td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          Microsoft Surface Pro
        </th>
        <td className="px-6 py-4">White</td>
        <td className="px-6 py-4">Laptop PC</td>
        <td className="px-6 py-4">$1999</td>
        <td className="px-6 py-4 text-right">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </a>
        </td>
      </tr>
      <tr className="bg-white dark:bg-gray-800">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          Magic Mouse 2
        </th>
        <td className="px-6 py-4">Black</td>
        <td className="px-6 py-4">Accessories</td>
        <td className="px-6 py-4">$99</td>
        <td className="px-6 py-4 text-right">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </a>
        </td>
      </tr>
    </tbody>
  </table> */}
</div>


  );
}
