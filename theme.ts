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
    brands: {
      logInBgColor: "#fff",
      logInTextColor: "white",
      danger: "#BF3131",
      hoverDanger: "#7D0A0A",
    },
     dark: "#000000",
        blue: "#0000ee",
        blue_two: "#000e25",
        blue_three: "0c1c19",
        gray: "#6e7581",
        gray_two: "#aaadb0",
        gray_three: "#d9dce2",
        gray_four: "#dddddd",
        sky: "#a8b6ce",
        pink: "#ffdede",
        "#05b9de": "#05b9de",
        sky_one: "#052e73",
        brown: "#333333",
        slate: "#4b5362",
        sky_two: "#5cd1e9",
        gray_opacity: "#122258",
        neat: {
          primary: "#05b9de",
          secondary: "#052e73",
          tertiary: "#000e25",
          pearlwhite: "#f6faff",
        },
  },
   
  

});
