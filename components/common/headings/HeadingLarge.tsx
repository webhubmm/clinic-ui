import React from "react";

interface HeaderLargeProp {
  children: string;
}

const HeadingLarge = ({ children }: HeaderLargeProp) => {
  return <h1 className=" text-6xl font-bold">{children}</h1>;
};

export default HeadingLarge;
