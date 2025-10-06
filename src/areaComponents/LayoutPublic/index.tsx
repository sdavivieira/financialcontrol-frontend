// LayoutPublic.tsx
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutPublic: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="w-full max-w-md p-6 bg-grey-200 rounded shadow">
        {children}
      </div>
    </div>
  );
};

export default LayoutPublic;
