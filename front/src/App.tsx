import React from "react";
import "./App.css";
import TilAdd from "./components/TilAdd";
import TilList from "./components/TilList";

import tilHeader from "./assets/images/til_header.png";

export interface TilListItem {
  id: string;
  summary?: string;
  url?: string;
  createdAt: number;
}

function App() {
  return (
    <div className="grid grid-rows-[200px_1fr]">
      <header className="self-center justify-self-center p-4">
        <img
          src={tilHeader}
          alt="Today I Learned"
          className="object-contain h-24"
        />
      </header>
      <div className="flex flex-col gap-8 items-center">
        <TilList />
        <TilAdd />
      </div>
    </div>
  );
}

export default App;
