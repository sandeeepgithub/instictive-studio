import React from "react";

interface ButtonProps {
  clickHandler: () => void;
  isDisabled?: boolean;
  title: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  clickHandler,
  isDisabled,
  title,
  className,
}) => {
  return (
    <button onClick={clickHandler} disabled={isDisabled} className={className}>
      {title}
    </button>
  );
};

export default Button;
