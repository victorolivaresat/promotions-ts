import React from "react";

const Card = ({ title, children }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white">
      {title && <h2 className="mb-4 text-lg font-semibold">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
