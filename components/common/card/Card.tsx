import React from "react";

interface CardProp {
  children: React.ReactElement;
  bgColor?: string;
}

const Card = ({ children, bgColor = "white" }: CardProp) => {
  return (
    <div className={`px-10 py-7 rounded-lg shadow-md ${bgColor}`}>
      {children}
    </div>
  );
};

export default Card;
