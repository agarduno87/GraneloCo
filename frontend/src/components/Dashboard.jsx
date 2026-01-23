import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [counts, setCounts] = useState({ productos:0, clientes:0, ventas:0 });

  useEffect(() => {
    const fetch = async () => {
      try {
        const p = await api.get("/productos");
        const c = await api.get("/clientes");
        const v = await api.get("/ventas");
        setCounts({ productos: p.data.length, clientes: c.data.length, ventas: v.data.length });
      } catch (e) {
        console.log("Error cargando dashboard", e);
      }
    };
    fetch();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <div style={{ display:"flex", gap:20 }}>
        <div>Productos: {counts.productos}</div>
        <div>Clientes: {counts.clientes}</div>
        <div>Ventas: {counts.ventas}</div>
      </div>
    </div>
  );
}
