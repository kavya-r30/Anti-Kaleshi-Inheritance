import React from "react";
import "./App.css";
import logo from "./assets/logo.png"; // Ensure the path is correct

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/">
          {" "}
          {/* Use anchor tag for refreshing the page */}
          <img src={logo} alt="Logo" className="App-logo" />
        </a>
      </header>
    </div>
  );
}

export default App;
