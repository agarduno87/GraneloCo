// src/components/Charts.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

export default function Charts() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/ventas/stats").then(res => setStats(res.data));
  }, []);

  if (!stats) return null;

  return (
    <div>
      <h2>Estadísticas</h2>
      <p>Total ventas: {stats.total_ventas}</p>
      <p>Total ingresos: ${stats.total_ingresos}</p>
    </div>
  );
}
