"use client";
import { Button } from "@chakra-ui/react";
import React from "react";

interface ButtonProp {
  placeholder: string;
  onClick?: () => void;
  
}

const ButtonSecondary = ({ placeholder, onClick }: ButtonProp) => {
  return (
    <Button
      onClick={onClick}

      
      fontWeight='bold'
      color="neat.secondary"
      size="lg"
      border='2px'
      borderColor='neat.secondary'
      paddingY={{sm:'0.5rem',md:'15px'}}
      paddingX={{sm:"20px",md:"32px"}}
      borderRadius="25px"
      _hover={{bg:"neat.secondary",borderColor:'neat.secondary',color:"brands.logInTextColor"
    ,
    transitionDuration: '150ms',
    transitionTimingFunction: "ease-in"
  }}
      >
      {placeholder}
    </Button>
  );
};

export default ButtonSecondary;
