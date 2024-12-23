import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/logo.png"; // Ensure the path is correct
import Loader from "./components/Loader"; // Import the Loader component
import Navbar from "./components/Navbar"; // Import the Navbar component

function App() {
  // State to control loader visibility
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 7.8 seconds before fading out
    const timer = setTimeout(() => {
      setIsLoading(false); // After fading out, hide the loader
    }, 4900); // 7.8 seconds for loader to show

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <div className="App">
      {/* Conditionally render loader based on isLoading state */}
      {isLoading ? (
        <Loader /> // Use the Loader component
      ) : (
        <>
          {/* Render Navbar component */}
          <Navbar />
          <header className="App-header">
            <a href="/">
              <img src={logo} alt="Logo" className="App-logo" />
            </a>
          </header>
        </>
      )}
    </div>
  );
}

export default App;
