import React, { useEffect, useState } from "react";
import { getVentas, postVenta, getProductos, getClientes } from "../api";

export default function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [clienteId, setClienteId] = useState("");
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState("");

  const fetchData = async () => {
    setVentas((await getVentas()).data);
    setClientes((await getClientes()).data);
    setProductos((await getProductos()).data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postVenta({
      cliente_id: parseInt(clienteId),
      producto_id: parseInt(productoId),
      cantidad_kg: parseFloat(cantidad),
    });
    setClienteId("");
    setProductoId("");
    setCantidad("");
    fetchData();
  };

  return (
    <div>
      <h2>Ventas</h2>
      <form onSubmit={handleSubmit}>
        <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
          <option value="">Selecciona Cliente</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
        <select value={productoId} onChange={(e) => setProductoId(e.target.value)} required>
          <option value="">Selecciona Producto</option>
          {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
        </select>
        <input value={cantidad} onChange={(e) => setCantidad(e.target.value)} placeholder="Cantidad (kg)" required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Registrar Venta</button>
      </form>

      <table>
        <thead><tr><th>Cliente</th><th>Producto</th><th>Cantidad</th><th>Total</th></tr></thead>
        <tbody>
          {ventas.map(v => (
            <tr key={v.id}>
              <td>{v.cliente.nombre}</td>
              <td>{v.producto.nombre}</td>
              <td>{v.cantidad_kg}</td>
              <td>{v.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
