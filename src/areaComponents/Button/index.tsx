import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  size?: "full" | "sm" | "md" | "lg"; 
  className?: string;
  onClick?: () => void;
  variant?: "filled" | "outline";
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  size = "full",
  className,
  onClick,
  variant = "filled",
  disabled = false,
}) => {
  const sizeClass = {
    full: "w-full py-3",
    sm: "w-24 py-1.5",
    md: "w-36 py-2.5",
    lg: "w-48 py-3",
  }[size];

  const baseClass = `font-bold rounded px-4 transition-colors duration-200 focus:outline-none`;

  const variantClass =
    variant === "filled"
      ? "bg-green-400 text-gray-900 hover:bg-green-500 disabled:bg-gray-300 disabled:text-gray-500"
      : "bg-transparent border border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-green-500 disabled:border-green-300 disabled:text-green-300"
;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass} ${sizeClass} ${className ?? ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
