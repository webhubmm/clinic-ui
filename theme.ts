import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  base: "0px",
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  xxl: "1536px",
};

export const theme = extendTheme({
  breakpoints,
  colors: {
    brand: {},
  },
});
