import React, { ReactNode } from "react";

type CardProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  /** Tamanho do card de 1 a 12 */
  tam?: number;
};

export default function Card({ title, description, children, tam = 4 }: CardProps) {
  const size = Math.min(Math.max(tam, 1), 12);

  // Map do tam para col-span
  const colSpanClasses = [
    "", // 0
    "col-span-1",
    "col-span-2",
    "col-span-3",
    "col-span-4",
    "col-span-5",
    "col-span-6",
    "col-span-7",
    "col-span-8",
    "col-span-9",
    "col-span-10",
    "col-span-11",
    "col-span-12",
  ];

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between ${colSpanClasses[size]}`}>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">{title}</h3>
        {description && <p className="text-gray-500 mb-4">{description}</p>}
      </div>
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
}
