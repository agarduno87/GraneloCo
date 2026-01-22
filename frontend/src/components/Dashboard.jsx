import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/global.css";

export default function Dashboard() {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cData, pData, vData] = await Promise.all([
          api.getClientes(),
          api.getProductos(),
          api.getVentas(),
        ]);
        setClientes(cData);
        setProductos(pData);
        setVentas(vData);
      } catch (err) {
        console.error("Error dashboard:", err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading)
    return <p style={{ textAlign: "center", fontSize: "1.2rem" }}>Loading…</p>;

  return (
    <div>
      {/* Cabecera con tu imagen de menú */}
      <div className="card" style={{ textAlign: "center" }}>
        <img
          src="https://drive.google.com/uc?export=view&id=1Z1QN7tdzuOcR4jQraO9r16zMV-Xp4NsT"
          alt="Menú GraneloCo"
          style={{ maxWidth: "250px", margin: "0 auto" }}
        />
      </div>

      {/* Tarjetas resumen */}
      <div className="card">
        <h2>Total Clientes</h2>
        <p>{clientes.length}</p>
      </div>

      <div className="card">
        <h2>Total Productos</h2>
        <p>{productos.length}</p>
      </div>

      <div className="card">
        <h2>Total Ventas</h2>
        <p>{ventas.length}</p>
      </div>

      {/* Listas simplificadas */}
      <div className="card">
        <h2>Clientes</h2>
        <ul className="dashboard-list">
          {clientes.map((c) => (
            <li key={c.id}>{c.nombre}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Productos</h2>
        <ul className="dashboard-list">
          {productos.map((p) => (
            <li key={p.id}>{p.nombre}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Ventas</h2>
        <ul className="dashboard-list">
          {ventas.map((v) => (
            <li key={v.id}>
              {v.cliente_nombre} — {v.producto_nombre} × {v.cantidad}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
