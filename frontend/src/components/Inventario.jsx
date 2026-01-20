// src/components/Inventario.jsx
import React, { useState, useEffect } from "react";
import api from "../api";
import Modal from "./Modal";

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [productoForm, setProductoForm] = useState({
    nombre: "",
    precio_kg: "",
    stock_kg: "",
  });
  const [error, setError] = useState("");

  const fetchProductos = async () => {
    try {
      const res = await api.get("/productos");
      setProductos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/productos", {
        nombre: productoForm.nombre,
        precio_kg: parseFloat(productoForm.precio_kg),
        stock_kg: parseFloat(productoForm.stock_kg),
      });
      setModalOpen(false);
      setProductoForm({ nombre: "", precio_kg: "", stock_kg: "" });
      fetchProductos();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Error guardando producto");
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Inventario</h2>
        <button
          className="bg-[#004aad] text-white p-2 rounded"
          onClick={() => setModalOpen(true)}
        >
          Agregar Producto
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio (kg)</th>
            <th>Stock (kg)</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>${p.precio_kg.toFixed(2)}</td>
              <td>{p.stock_kg.toFixed(2)} kg</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalOpen}
        title="Nuevo Producto"
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSave} className="flex flex-col gap-2">
          <input
            placeholder="Nombre"
            value={productoForm.nombre}
            onChange={(e) =>
              setProductoForm({ ...productoForm, nombre: e.target.value })
            }
            className="p-2 border rounded"
            required
          />

          <input
            placeholder="Precio por kg"
            type="number"
            step="0.01"
            value={productoForm.precio_kg}
            onChange={(e) =>
              setProductoForm({ ...productoForm, precio_kg: e.target.value })
            }
            className="p-2 border rounded"
            required
          />

          <input
            placeholder="Stock inicial (kg)"
            type="number"
            step="0.01"
            value={productoForm.stock_kg}
            onChange={(e) =>
              setProductoForm({ ...productoForm, stock_kg: e.target.value })
            }
            className="p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="bg-[#004aad] text-white p-2 rounded"
          >
            Guardar
          </button>
        </form>
      </Modal>
    </div>
  );
}
