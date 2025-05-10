import React from "react";

const UBoxLogo: React.FC = () => {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="boxGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00BFFF" />
          <stop offset="100%" stopColor="#1E90FF" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="20" fill="#000000" />

      <text
        x="50%"
        y="45%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="80"
        fontWeight="bold"
        fill="white"
      >
        U
      </text>

      <text
        x="50%"
        y="70%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="30"
        fontWeight="bold"
        fill="url(#boxGradient)"
        letterSpacing="5"
      >
        BOX
      </text>
    </svg>
  );
};

export default UBoxLogo;
