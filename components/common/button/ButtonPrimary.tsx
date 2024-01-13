"use client";
import React from "react";

interface ButtonProp {
  placeholder: string;
  onClick: () => void;
}

const ButtonPrimary = ({ placeholder, onClick }: ButtonProp) => {
  return (
    <button
      onClick={onClick}
      className=" bg-neat-primary border-2 font-bold border-neat-primary text-white rounded-full px-8 py-3 hover:bg-white hover:border-neat-secondary hover:text-neat-secondary transition-colors duration-150">
      {placeholder}
    </button>
  );
};

export default ButtonPrimary;
