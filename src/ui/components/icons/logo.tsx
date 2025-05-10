import React from "react";

const RBLogo: React.FC = () => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="200" height="200" rx="20" fill="#000000" />
      <text
        x="50%"
        y="55%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="100"
        fontWeight="bold"
        fill="white"
      >
        <tspan fill="white">R</tspan>
        <tspan fill="#00BFFF">B</tspan>
      </text>
    </svg>
  );
};

export default RBLogo;
