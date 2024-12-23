import React, { useEffect, useState } from "react";
import "./Loader.css"; // Import the styles for the loader component

const Loader = () => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start the fade-out animation after 4.9 seconds
    const timer = setTimeout(() => {
      setIsFadingOut(true); // Start the fade-out animation
    }, 4900); // 4.9 seconds for loader to show

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <div id="loader" className={isFadingOut ? "fadeOut" : ""}>
      <div id="box"></div>
      <div id="hill"></div>
    </div>
  );
};

export default Loader;
