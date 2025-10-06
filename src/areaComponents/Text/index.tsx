import React from "react";

type InputTextoProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  size?: "full" | "sm" | "md" | "lg";
  className?: string;
  label?: string;
  id?: string;
};

const InputTexto: React.FC<InputTextoProps> = ({
  value,
  onChange,
  placeholder,
  type = "text",
  size = "full",
  className,
  label,
  id,
}) => {
  const sizeClass = {
    full: "w-full",
    sm: "w-24",
    md: "w-36",
    lg: "w-48",
  }[size];

  return (
    <div className="flex flex-col mb-2">
      {label && (
        <label htmlFor={id} className="mb-1 text-gray-800 font-medium text-sm">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-3 py-2 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors ${sizeClass} ${className ?? ""}`}
      />
    </div>
  );
};

export default InputTexto;