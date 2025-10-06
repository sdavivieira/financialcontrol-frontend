import React from "react";

function Header() {
  return (
    <header>
      <nav className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 lg:px-6 py-4">
        <div className="flex justify-center items-center mx-auto max-w-screen-lg">
          <span className="text-2xl md:text-3xl font-bold text-white">
            Controle Financeiro
          </span>
        </div>
      </nav>
    </header>
  );
}

export default Header;