import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/logo.png"; // Ensure the path is correct

function App() {
  // State to control loader visibility
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Simulate loading for 7.8 seconds before fading out
    const timer = setTimeout(() => {
      setIsFadingOut(true); // Start the fade-out animation
    }, 5300); // 7.8 seconds for loader to show

    // Remove loader after fade-out animation completes
    const removeTimer = setTimeout(() => {
      setIsLoading(false); // After fading out, hide the loader
    }, 5300); // Delay to match the fade-out transition duration

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div className="App">
      {/* Conditionally render loader based on isLoading state */}
      {isLoading ? (
        <div id="loader" className={isFadingOut ? "fadeOut" : ""}>
          <div id="box"></div>
          <div id="hill"></div>
        </div>
      ) : (
        <header className="App-header">
          <a href="/">
            <img src={logo} alt="Logo" className="App-logo" />
          </a>
        </header>
      )}
    </div>
  );
}

export default App;
