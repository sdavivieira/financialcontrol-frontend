import React, { useState } from "react";

function Header() {

  return (
    <header>
      <nav className="bg-green-50 border-gray-200 px-4 lg:px-6 py-4 shadow">
        <div className="flex justify-center items-center mx-auto max-w-screen-lg">
          <span className="text-2xl md:text-3xl font-bold text-gray-900">
            Controle Financeiro
          </span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
