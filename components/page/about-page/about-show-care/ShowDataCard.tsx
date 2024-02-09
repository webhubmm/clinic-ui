import { Card, Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
interface dataProps {
  showData: number;
  icons: string;
  desc: string;
}
export default function ShowDataCard({ data }: { data: dataProps }) {
  return (
    <Card
      padding="30px"
      minW={{ sm: "50%", md: "200px", lg: "280px" }}
      height={{ sm: "auto", md: "300px", lg: "260px" }}
      shadow="md"
    >
      <Box
        display="flex"
        flexDir="column"
        gap="5"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={data?.icons} alt="" width={60} height={60} />
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading color="neat.secondary">{data?.showData}</Heading>
          <Text color="slate" fontWeight="600">
            {data?.desc}
          </Text>
        </Box>
      </Box>
    </Card>
  );
}
