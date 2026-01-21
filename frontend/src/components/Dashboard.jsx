import React, { useEffect, useState } from "react";
import { getClientes, getProductos, getVentas } from "../api";
import "./ButtonBlue.css";

export default function Dashboard() {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const clientesData = await getClientes();
    const productosData = await getProductos();
    const ventasData = await getVentas();
    setClientes(clientesData);
    setProductos(productosData);
    setVentas(ventasData);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-sections">
        <div>
          <h2>Clientes</h2>
          <p>Total: {clientes.length}</p>
        </div>
        <div>
          <h2>Productos</h2>
          <p>Total: {productos.length}</p>
        </div>
        <div>
          <h2>Ventas</h2>
          <p>Total: {ventas.length}</p>
        </div>
      </div>
      <button className="btn-blue" onClick={fetchData}>
        Actualizar Datos
      </button>
    </div>
  );
}
