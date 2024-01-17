import React from "react";

interface TextSmallProp {
  children: string;
  color?: string | undefined;
}

const TextSmall = ({ children, color }: TextSmallProp) => {
  return (
    <h1 className={` text-sm lg:text-base font-semibold ${color ?? ""}`}>
      {children}
    </h1>
  );
};

export default TextSmall;
