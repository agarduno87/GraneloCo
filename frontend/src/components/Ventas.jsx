// src/components/Ventas.jsx
import React, { useState, useEffect } from "react";
import api from "../api";
import Modal from "./Modal";

export default function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [ventaNueva, setVentaNueva] = useState({
    cliente_id: "",
    items: [],
  });

  const [itemTemp, setItemTemp] = useState({
    producto_id: "",
    cantidad_kg: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchVentas = async () => {
    try {
      const res = await api.get("/ventas");
      setVentas(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchClientes = async () => {
    try {
      const res = await api.get("/clientes");
      setClientes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProductos = async () => {
    try {
      const res = await api.get("/productos");
      setProductos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVentas();
    fetchClientes();
    fetchProductos();
  }, []);

  const agregarItem = () => {
    setError("");
    if (!itemTemp.producto_id) {
      setError("Selecciona un producto");
      return;
    }
    const cantidad = parseFloat(itemTemp.cantidad_kg);
    if (isNaN(cantidad) || cantidad <= 0) {
      setError("Introduce una cantidad válida");
      return;
    }

    setVentaNueva((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          producto_id: itemTemp.producto_id,
          cantidad_kg: cantidad,
        },
      ],
    }));

    setItemTemp({ producto_id: "", cantidad_kg: "" });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!ventaNueva.cliente_id) {
      setError("Selecciona un cliente");
      return;
    }

    if (ventaNueva.items.length === 0) {
      setError("Agrega al menos un item");
      return;
    }

    try {
      await api.post("/ventas", ventaNueva);
      setSuccess("Venta registrada con éxito");
      setModalOpen(false);
      setVentaNueva({ cliente_id: "", items: [] });
      fetchVentas();
      fetchProductos();
    } catch (err) {
      setError(err.response?.data?.detail || "Error al registrar venta");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: 24 }}>Ventas</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <table style={{ width: "100%", marginBottom: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>
                {
                  clientes.find((c) => c.id === v.cliente_id)?.nombre
                }
              </td>
              <td>${v.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => setModalOpen(true)}
        className="bg-[#004aad] text-white p-2 rounded"
      >
        Registrar Venta
      </button>

      <Modal
        isOpen={modalOpen}
        title="Registrar Venta"
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSave} className="flex flex-col gap-2">
          <select
            value={ventaNueva.cliente_id}
            onChange={(e) =>
              setVentaNueva({ ...ventaNueva, cliente_id: e.target.value })
            }
          >
            <option value="">Selecciona Cliente</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>

          <div style={{ display: "flex", gap: "10px" }}>
            <select
              value={itemTemp.producto_id}
              onChange={(e) =>
                setItemTemp({ ...itemTemp, producto_id: e.target.value })
              }
            >
              <option value="">Producto</option>
              {productos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} - ${p.precio_kg.toFixed(2)} /kg (stock:{" "}
                  {p.stock_kg.toFixed(2)} kg)
                </option>
              ))}
            </select>

            <input
              type="number"
              step="0.01"
              min="0"
              value={itemTemp.cantidad_kg}
              onChange={(e) =>
                setItemTemp({
                  ...itemTemp,
                  cantidad_kg: e.target.value,
                })
              }
              placeholder="Cantidad (kg)"
            />

            <button type="button" onClick={agregarItem}>
              Agregar
            </button>
          </div>

          <ul>
            {ventaNueva.items.map((i, idx) => {
              const prod = productos.find((p) => p.id === i.producto_id);
              return (
                <li key={idx}>
                  {prod?.nombre} x {i.cantidad_kg} kg
                </li>
              );
            })}
          </ul>

          <button type="submit">Guardar</button>
        </form>
      </Modal>
    </div>
  );
}
