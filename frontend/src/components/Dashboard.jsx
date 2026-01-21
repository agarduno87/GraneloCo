import React, { useEffect, useState } from "react";
import api from "../api";
import "./ButtonBlue.css";

export default function Dashboard() {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [clientesData, productosData, ventasData] = await Promise.all([
        api.getClientes(),
        api.getProductos(),
        api.getVentas(),
      ]);
      setClientes(clientesData);
      setProductos(productosData);
      setVentas(ventasData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Cargando Dashboard...</div>;

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <section className="dashboard-section">
        <h2>Clientes</h2>
        {clientes.length === 0 ? (
          <p>No hay clientes registrados</p>
        ) : (
          <ul>
            {clientes.map((cliente) => (
              <li key={cliente.id}>{cliente.nombre}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="dashboard-section">
        <h2>Productos</h2>
        {productos.length === 0 ? (
          <p>No hay productos registrados</p>
        ) : (
          <ul>
            {productos.map((producto) => (
              <li key={producto.id}>{producto.nombre}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="dashboard-section">
        <h2>Ventas</h2>
        {ventas.length === 0 ? (
          <p>No hay ventas registradas</p>
        ) : (
          <ul>
            {ventas.map((venta) => (
              <li key={venta.id}>
                {venta.cliente_nombre} compró {venta.producto_nombre} -{" "}
                {venta.cantidad} unidades
              </li>
            ))}
          </ul>
        )}
      </section>

      <button className="btn-blue" onClick={() => alert("Función de prueba")}>
        Acción de prueba
      </button>
    </div>
  );
}
