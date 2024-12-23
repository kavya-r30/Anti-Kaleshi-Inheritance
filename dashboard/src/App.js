import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/logo.png"; // Ensure the path is correct

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Duration of the fade-out animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`App ${isLoading ? "fade-out" : "fade-in"}`}>
      <header className="App-header">
        <a href="/">
          <img src={logo} alt="Logo" className="App-logo" />
        </a>
      </header>
    </div>
  );
}

export default App;
