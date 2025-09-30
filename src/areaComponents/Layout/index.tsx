// components/Layout.tsx
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
<div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#e6f9e6' }}>
      <div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
