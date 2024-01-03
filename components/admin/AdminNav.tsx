import { Text, Box, Flex, Input, Spacer, HStack ,Avatar } from "@chakra-ui/react";
import { IoIosNotifications } from "react-icons/io";

export default function AdminNav() {
  return (
    <Flex
      // justifyContent="space-between"
      position="fixed"
      backgroundColor={`rgba(244, 247, 254, 0.2),rgba(11,20,55,0.5)`}
      backdropFilter="saturate(180%) blur(5px)"
      w="80%"
    >
      <Box>
        <Text fontSize="35px" fontWeight="bold">
          {" "}
          Main Dashboard
        </Text>
      </Box>
      <Spacer />
      <Box bgColor="#ffffff" marginRight="7px" p="10px" borderRadius="10px">
        <HStack spacing='15px'>
          <Input placeholder="Search" width="200px" />
          <IoIosNotifications size={25} />
          <Avatar    size="sm" name='John'/>
        </HStack>
      </Box>
    </Flex>
  );
}
