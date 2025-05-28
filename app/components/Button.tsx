import React from "react";

const Button = ({ clickHandler, isDisabled, title, className }) => {
  return (
    <button onClick={clickHandler} disabled={isDisabled} className={className}>
      {title}
    </button>
  );
};

export default Button;
