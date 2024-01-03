import { Box, Grid, GridItem } from "@chakra-ui/react";

export default function MainDashboard() {
  return (
    <Grid templateColumns="repeat(6,1fr)" gap={4}>
      <GridItem>
        <Box border="1px" height="80px">
          Box1
        </Box>
      </GridItem>
      <GridItem>
        <Box border="1px" height="80px">
          Box1
        </Box>
      </GridItem>
      <GridItem>
        <Box border="1px" height="80px">
          Box1
        </Box>
      </GridItem>
      <GridItem>
        <Box border="1px" height="80px">
          Box1
        </Box>
      </GridItem>
      <GridItem>
        <Box border="1px" height="80px">
          Box1
        </Box>
      </GridItem>
      <GridItem>
        <Box border="1px" height="80px">
          Box1
        </Box>
      </GridItem>
      <GridItem colSpan={3}>
        <Box border="1px" height="300px">
          Box1
        </Box>
      </GridItem>
      <GridItem colSpan={3}>
        <Box border="1px" height="300px">
          Box1
        </Box>
      </GridItem>
      <GridItem colSpan={2}>
        <Box border="1px" height="300px">
          Box1
        </Box>
      </GridItem>
      <GridItem colSpan={2}>
        <Box border="1px" height="300px">
          Box1
        </Box>
      </GridItem>
      <GridItem colSpan={2}>
        <Box border="1px" height="300px">
          Box1
        </Box>
      </GridItem>
    </Grid>
  );
}
