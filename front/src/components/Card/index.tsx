import React from "react";

function Card({ title, children }: { title: string; children: JSX.Element }) {
  return (
    <section className="w-[512px] shadow-card shadow-blue-logo/70 rounded-2xl overflow-hidden">
      <header className="bg-blue-logo/25 p-6">
        <h2 className="font-semibold text-2xl">{title}</h2>
      </header>
      <div className="bg-blue-logo/10 p-3">{children}</div>
    </section>
  );
}

export default Card;
