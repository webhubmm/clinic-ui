"use client";

import { getAuth, getToken } from "@/lib/auth";
import { Box } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Text, Flex, SimpleGrid } from "@chakra-ui/react";
import MiniStatistics from "@/components/admin/MiniStatistics";

const Dashboard = () => {
  // const router = useRouter();
  // const pathname = usePathname();
  // useEffect(() => {
  //   const checkAuth = getAuth();

  //   console.log("checkAuth :: ", checkAuth);
  //   const accessToken = getToken();
  //   if (
  //     checkAuth === null ||
  //     checkAuth?.status === 1 ||
  //     accessToken === undefined
  //   ) {
  //     router.push("./login");
  //   } else if (pathname === "/login" && checkAuth !== null) {
  //     router.push("/");
  //   }
  // }, [pathname]);
  console.log("hello");
  return (
    <Box mt="90px">
      <>
        <Text fontSize={20} mb={10} fontWeight={500}>
          Dashboard
        </Text>
        <Flex flexDirection="column">
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
            <MiniStatistics
              title={"Total Revenue"}
              amount={"$53,000"}
              percentage={55}
            />
            <MiniStatistics
              title={"Total Owner"}
              amount={"2,300"}
              percentage={5}
            />
            <MiniStatistics
              title={"Total Court"}
              amount={"3,020"}
              percentage={-14}
            />
            <MiniStatistics
              title={"Total User"}
              amount={"173,000"}
              percentage={8}
            />
          </SimpleGrid>
        </Flex>
      </>
    </Box>
  );
};

export default Dashboard;
