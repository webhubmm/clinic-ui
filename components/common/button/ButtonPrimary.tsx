"use client";
import { Button } from "@chakra-ui/react";
import React from "react";

interface ButtonProp {
  placeholder: string;
  onClick?: () => void;
}

const ButtonPrimary = ({ placeholder, onClick }: ButtonProp) => {
  return (
    <Button
      onClick={onClick}
      fontWeight='bold'
      color="white"
      size="lg"
      border='2px'
      borderColor='neat.primary'
      paddingY={{sm:'0.5rem',lg:'15px'}}
      paddingX={{sm:"20px",lg:"32px"}}
      borderRadius="25px"
      _hover={{bg:"#fff",borderColor:'neat.primary',border:'2px',color:"neat.secondary"
    ,
    transitionDuration: '0.6s',
    transitionTimingFunction: "ease-in"
  }}
      bg="neat.primary">
      {placeholder}
    </Button>
  );
};

export default ButtonPrimary;
