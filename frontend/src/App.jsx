// src/App.jsx
import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("user")) || null);

  return (
    <div className="h-screen font-sans">
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}
