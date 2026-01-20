// src/components/Dashboard.jsx
import React, { useState } from "react";
import Ventas from "./Ventas";
import Inventario from "./Inventario";
import Clientes from "./Clientes";
import Charts from "./Charts";

export default function Dashboard() {
  const [section, setSection] = useState("Ventas");

  const renderSection = () => {
    switch (section) {
      case "Ventas": return <Ventas />;
      case "Inventario": return <Inventario />;
      case "Clientes": return <Clientes />;
      case "Charts": return <Charts />;
      default: return <Ventas />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "FF Providence Sans" }}>
      {/* Menú lateral */}
      <aside style={{
        width: 220,
        backgroundColor: "#004aad",
        color: "#fff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}>
        <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>Granel Co.</h2>
        {["Ventas","Inventario","Clientes","Charts"].map(sec => (
          <button
            key={sec}
            onClick={() => setSection(sec)}
            style={{
              backgroundColor: section===sec ? "#003380" : "transparent",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
              textAlign: "left"
            }}
          >
            {sec}
          </button>
        ))}
      </aside>

      {/* Contenido */}
      <main style={{ flex: 1, padding: "20px", backgroundColor: "#f5f5f5", overflowY: "auto" }}>
        {renderSection()}
      </main>
    </div>
  );
}
