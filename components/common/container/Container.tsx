import React from "react";

interface ContainerProp {
  children: React.ReactElement;
}

const Container = ({ children }: ContainerProp) => {
  return (
    <div className=" mx-auto px-10 md:px-20 lg:px-0 lg:max-w-screen-xl">
      {children}
    </div>
  );
};

export default Container;
