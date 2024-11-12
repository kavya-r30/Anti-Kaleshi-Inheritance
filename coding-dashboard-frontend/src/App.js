// src/App.js
import React from "react";

function App() {
  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome to the Coding Dashboard
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        Your personal coding workspace.
      </p>
      <img
        src="/path-to-your-image.jpg"
        alt="Coding Dashboard"
        className="mt-8 rounded-lg shadow-lg"
      />
    </div>
  );
}

export default App;
