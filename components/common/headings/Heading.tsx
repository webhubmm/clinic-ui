import React from "react";

interface HeadingProp {
  children: string;
}

const Heading = ({ children }: HeadingProp) => {
  return <h1 className=" text-3xl md:text-4xl font-bold">{children}</h1>;
};

export default Heading;
