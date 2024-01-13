import React from "react";

interface ContainerProp {
  children: React.ReactElement;
}

const Container = ({ children }: ContainerProp) => {
  return (
    <div className=" mx-auto max-w-screen-xl max-h-screen">{children}</div>
  );
};

export default Container;
