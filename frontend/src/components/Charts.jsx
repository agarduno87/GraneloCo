import React, { useEffect, useState } from "react";
import { getVentasStats } from "../api";

export default function Charts() {
  const [stats, setStats] = useState({ total_kg: 0, total_recaudado: 0 });

  const fetchStats = async () => {
    const res = await getVentasStats();
    setStats(res.data);
  };

  useEffect(() => { fetchStats(); }, []);

  return (
    <div>
      <h2>Estadísticas de Ventas</h2>
      <p>Total kg vendidos: {stats.total_kg}</p>
      <p>Total recaudado: ${stats.total_recaudado}</p>
    </div>
  );
}
