import React, { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/Loader"; // Existing Loader component
import Navbar from "./components/Navbar"; // Navbar component
import Animation from "./components/Animation"; // New Animation component

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Animation />
        </>
      )}
    </div>
  );
}

export default App;
