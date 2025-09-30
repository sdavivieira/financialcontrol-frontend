// components/InputTexto.tsx
import React from "react";

type InputTextoProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  size?: "full" | "sm" | "md" | "lg";
  className?: string;
};

const InputTexto: React.FC<InputTextoProps> = ({
  value,
  onChange,
  placeholder,
  type = "text",
  size = "full",
  className,
}) => {
  const sizeClass = {
    full: "w-full",
    sm: "w-24",
    md: "w-36",
    lg: "w-48",
  }[size];

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 ${sizeClass} ${className ?? ""}`}
    />
  );
};

export default InputTexto;
