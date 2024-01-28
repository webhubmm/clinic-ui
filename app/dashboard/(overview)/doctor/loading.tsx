import React from "react";
import DotLoader from "react-spinners/DotLoader";

export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <DotLoader color="#36d7b7" size={18} />
    </div>
  );
}
