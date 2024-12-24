import React from "react";
import "./Animation.css";

const Animation = () => {
  return (
    <div className="container">
      <div className="box">
        {Array.from({ length: 16 }).map((_, i) => {
          return (
            <span key={i} style={{ "--i": i + 1 }}>
              <i>COMPETE</i> ANALYSE <i>IMPROVE</i>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Animation;
