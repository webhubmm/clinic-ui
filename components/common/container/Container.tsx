import React from "react";
import { Container } from "@chakra-ui/react";

interface ContainerProp {
  children: React.ReactNode;
}

const ContainerBox = ({ children }: ContainerProp) => {
  return (
    <Container
      maxW={{
        sm: "container.sm",
        md: "container.md",
        xl: "container.xl",
        lg: "container.xl",
      }}
    >
      {children}
    </Container>
  );
};

export default ContainerBox;
