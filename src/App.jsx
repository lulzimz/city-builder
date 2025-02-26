import { useState } from "react";
import "./App.css";
import { Header, Houses, HousesList } from "./components";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Header />

      <div className="content">
        <HousesList />

        <Houses />
      </div>
    </div>
  );
}

export default App;
