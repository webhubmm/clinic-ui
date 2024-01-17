import React from "react";

interface HeadingLargeProp {
  children: string;
}

const HeadingLarge = ({ children }: HeadingLargeProp) => {
  return <h1 className=" text-4xl md:text-6xl font-bold">{children}</h1>;
};

export default HeadingLarge;
