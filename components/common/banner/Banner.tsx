import React from "react";
import { Box ,Text,Container} from "@chakra-ui/react";

interface BannerProp {
  left: string;
  right: string;
}

const Banner = ({ left, right }: BannerProp) => {
  return (
    <Box  color="white" padding='8px' bg="neat.secondary" display={{sm:"none",lg:'block'}}
    //  className="  bg-neat-secondary text-white p-2 hidden lg:block"
     >
      <Container maxW='container.xl' >
        <Box  display='flex' 
        justifyContent='space-between'
        alignItems="center"
        // className="flex justify-between items-center"
        >
          <Text>{left}</Text>
          <Text>{right}</Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
