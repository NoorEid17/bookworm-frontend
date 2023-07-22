import React from "react";
import "./spinner.css";

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <span
        className={`loader mx-auto border-primary border-l-transparent`}
      ></span>
    </div>
  );
};

export default Spinner;
