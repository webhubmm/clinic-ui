"use client";
import React from "react";

interface ButtonProp {
  placeholder: string;
  onClick?: () => void;
}

const ButtonSecondary = ({ placeholder, onClick }: ButtonProp) => {
  return (
    <button
      onClick={onClick}
      className=" border-2 font-bold border-neat-secondary text-neat-secondary rounded-full px-5 py-2 md:px-8 md:py-3  hover:bg-neat-secondary hover:text-white transition-colors duration-150">
      {placeholder}
    </button>
  );
};

export default ButtonSecondary;
