import { Box, Grid, GridItem } from "@chakra-ui/react";

export default function MainDashboard() {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      <GridItem>
        <Box border="1px" height="80px">
          Box1
        </Box>
      </GridItem>
      <GridItem>
        <Box border="1px" height="80px">
          Box2
        </Box>
      </GridItem>
      <GridItem>
        <Box border="1px" height="80px">
          Box3
        </Box>
      </GridItem>
      <GridItem>
        <Box border="1px" height="80px">
          Box4
        </Box>
      </GridItem>
      <GridItem>
        <Box border="1px" height="80px">
          Box5
        </Box>
      </GridItem>
      <GridItem>
        <Box border="1px" height="80px">
          Box6
        </Box>
      </GridItem>

    </Grid>
   

  );
}
