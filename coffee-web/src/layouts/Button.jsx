import React from "react";

const Button = (props) => {
  return (
    <div>
    <button className="px-6 py-1 border-2 border-gray-200 bg-gray-200 text-black hover:text-white hover:bg-gray-200 transition-all rounded-full">
        {props.title}
      </button>
    </div>
  );
};

export default Button;
