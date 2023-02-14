import React from "react";


import "./App.css";
import { Header } from "./Header.jsx";
import { Players } from "./Players.jsx";
import { Arenas } from "./Arenas.jsx";
import { Teams } from "./Teams.jsx"
import { Positions } from "./Positions";

function App() {
  return (
    <div>
      <Header />
      <div className="mainGrid">
      <Players />
      <Arenas />
      <Teams />
      <Positions />
      </div>
    </div>
  );
}

export default App;
