import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Clientes from "./components/Clientes";
import Inventario from "./components/Inventario";
import Ventas from "./components/Ventas";
import Login from "./components/Login";
import "./styles/global.css"; // nuevo archivo para estilos globales

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/ventas" element={<Ventas />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
