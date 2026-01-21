import React, { useEffect, useState } from "react";
import { getProductos, addProducto } from "../api";
import "./ButtonBlue.css";

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  const handleAddProducto = async () => {
    if (!nombre || !precio || !stock) return;
    await addProducto({ nombre, precio: parseFloat(precio), stock: parseInt(stock) });
    setNombre(""); setPrecio(""); setStock("");
    fetchProductos();
  };

  return (
    <div>
      <h1>Inventario</h1>
      <div className="inventario-form">
        <input value={nombre} placeholder="Nombre" onChange={e => setNombre(e.target.value)} />
        <input value={precio} placeholder="Precio" onChange={e => setPrecio(e.target.value)} />
        <input value={stock} placeholder="Stock" onChange={e => setStock(e.target.value)} />
        <button className="btn-blue" onClick={handleAddProducto}>
          Agregar Producto
        </button>
      </div>
      <ul>
        {productos.map(p => (
          <li key={p.id}>{p.nombre} - ${p.precio} - Stock: {p.stock}</li>
        ))}
      </ul>
    </div>
  );
}
