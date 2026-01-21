import React, { useEffect, useState } from "react";
import { getProductos, postProducto } from "../api";

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: "", stock_kg: "", costo_kg: "" });

  const fetchProductos = async () => {
    const res = await getProductos();
    setProductos(res.data);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postProducto({
      nombre: form.nombre,
      stock_kg: parseFloat(form.stock_kg),
      costo_kg: parseFloat(form.costo_kg),
    });
    setForm({ nombre: "", stock_kg: "", costo_kg: "" });
    fetchProductos();
  };

  return (
    <div>
      <h2>Inventario</h2>
      <form onSubmit={handleSubmit}>
        <input value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} placeholder="Nombre" required />
        <input value={form.stock_kg} onChange={(e) => setForm({...form, stock_kg: e.target.value})} placeholder="Stock (kg)" required />
        <input value={form.costo_kg} onChange={(e) => setForm({...form, costo_kg: e.target.value})} placeholder="Costo/kg" required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Agregar Producto</button>
      </form>
      <table>
        <thead><tr><th>Nombre</th><th>Stock</th><th>Costo</th></tr></thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}><td>{p.nombre}</td><td>{p.stock_kg}</td><td>{p.costo_kg}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
