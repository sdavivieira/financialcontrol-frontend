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

  const baseClass = `font-semibold rounded-lg px-4 transition-all duration-200 focus:outline-none`;

  const variantClass =
    variant === "filled"
      ? "bg-emerald-500 text-white hover:bg-emerald-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
      : "bg-transparent border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed";

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