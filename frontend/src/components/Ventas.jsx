import React, { useEffect, useState } from "react";
import { getClientes, getProductos, postVenta } from "../api";
import "./ButtonBlue.css";

export default function Ventas() {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [clienteId, setClienteId] = useState("");
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setClientes((await getClientes()).data);
    setProductos((await getProductos()).data);
  };

  const registrarVenta = async () => {
    if (!clienteId || !productoId) return;
    try {
      await postVenta({
        cliente_id: parseInt(clienteId),
        producto_id: parseInt(productoId),
        cantidad_kg: parseFloat(cantidad),
      });
      setClienteId("");
      setProductoId("");
      setCantidad(1);
      fetchData();
    } catch (err) {
      console.error("Error registrando venta:", err);
    }
  };

  return (
    <div>
      <h1>Registrar Venta</h1>
      <select
        value={clienteId}
        onChange={(e) => setClienteId(e.target.value)}
      >
        <option value="">Selecciona Cliente</option>
        {clientes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nombre}
          </option>
        ))}
      </select>

      <select
        value={productoId}
        onChange={(e) => setProductoId(e.target.value)}
      >
        <option value="">Selecciona Producto</option>
        {productos.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nombre}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />

      <button className="btn-blue" onClick={registrarVenta}>
        Registrar Venta
      </button>
    </div>
  );
}
