import React from "react";

interface HeadingProp {
  children: string;
  color:string;
}

const Heading = ({ children,color }: HeadingProp) => {
  return (
    <Heading color={color}>
      {children}
    </Heading>
  );
};

export default Heading;
