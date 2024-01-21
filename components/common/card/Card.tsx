import React from "react";

interface CardProp {
  children: React.ReactElement;
  bgColor?: string;
}

const Card = ({ children, bgColor = "bg-white" }: CardProp) => {
  return (
    <div className={`px-10 py-7 rounded-lg shadow-lg ${bgColor}`}>
      {children}
    </div>
  );
};

export default Card;
