import React, { useEffect, useState } from "react";
import { getProductos, postProducto } from "../api";
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
    try {
      const res = await getProductos();
      setProductos(res.data);
    } catch (err) {
      console.error("Error obteniendo productos:", err);
    }
  };

  const agregarProducto = async () => {
    if (!nombre.trim()) return;
    try {
      await postProducto({
        nombre,
        precio_kg: parseFloat(precio),
        stock_kg: parseFloat(stock),
      });
      setNombre("");
      setPrecio("");
      setStock("");
      fetchProductos();
    } catch (err) {
      console.error("Error agregando producto:", err);
    }
  };

  return (
    <div>
      <h1>Inventario</h1>
      <div className="inventario-form">
        <input
          value={nombre}
          placeholder="Nombre del producto"
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          value={precio}
          placeholder="Precio por unidad"
          onChange={(e) => setPrecio(e.target.value)}
        />
        <input
          value={stock}
          placeholder="Stock disponible"
          onChange={(e) => setStock(e.target.value)}
        />
        <button className="btn-blue" onClick={agregarProducto}>
          Agregar Producto
        </button>
      </div>

      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} — ${p.precio_kg} — Stock: {p.stock_kg}
          </li>
        ))}
      </ul>
    </div>
  );
}
