import React, { useEffect, useState } from "react";
import { getClientes, getProductos, addVenta } from "../api";
import "./ButtonBlue.css";

export default function Ventas() {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState("");
  const [selectedProducto, setSelectedProducto] = useState("");
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setClientes(await getClientes());
    setProductos(await getProductos());
  };

  const handleAddVenta = async () => {
    if (!selectedCliente || !selectedProducto || cantidad <= 0) return;
    await addVenta({
      cliente_id: parseInt(selectedCliente),
      producto_id: parseInt(selectedProducto),
      cantidad: parseInt(cantidad),
    });
    setSelectedCliente(""); setSelectedProducto(""); setCantidad(1);
    fetchData();
  };

  return (
    <div>
      <h1>Ventas</h1>
      <div className="ventas-form">
        <select value={selectedCliente} onChange={e => setSelectedCliente(e.target.value)}>
          <option value="">Selecciona Cliente</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
        <select value={selectedProducto} onChange={e => setSelectedProducto(e.target.value)}>
          <option value="">Selecciona Producto</option>
          {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
        </select>
        <input type="number" min="1" value={cantidad} onChange={e => setCantidad(e.target.value)} />
        <button className="btn-blue" onClick={handleAddVenta}>
          Registrar Venta
        </button>
      </div>
    </div>
  );
}
