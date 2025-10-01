import React from "react";
import Header from "../../areaComponents/Header";
import Profile from "../../components/profile";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Profile />

        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
