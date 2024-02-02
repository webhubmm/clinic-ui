import React from "react";

interface TextProp {
  children: string;
  color?: string | undefined;
}

const Text = ({ children, color }: TextProp) => {
  return (
    <h1 className={`text-lg lg:text-xl font-semibold ${color ?? ""}`}>
      {children}
    </h1>
  );
};

export default Text;
