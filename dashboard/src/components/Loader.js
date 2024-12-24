import React, { useEffect, useState } from "react";
import "./Loader.css";

const Loader = () => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
    }, 4900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="loader" className={isFadingOut ? "fadeOut" : ""}>
      <div id="box"></div>
      <div id="hill"></div>
    </div>
  );
};

export default Loader;
