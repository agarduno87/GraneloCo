import React, { useEffect, useState } from "react";
import { getClientes, postCliente } from "../api";
import "./ButtonBlue.css";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const res = await getClientes();
      setClientes(res.data);
    } catch (err) {
      console.error("Error obteniendo clientes:", err);
    }
  };

  const agregarCliente = async () => {
    if (!nombre.trim()) return;
    try {
      await postCliente({ nombre });
      setNombre("");
      fetchClientes();
    } catch (err) {
      console.error("Error agregando cliente:", err);
    }
  };

  return (
    <div>
      <h1>Clientes</h1>

      <div className="clientes-form">
        <input
          value={nombre}
          placeholder="Nombre del cliente"
          onChange={(e) => setNombre(e.target.value)}
        />
        <button className="btn-blue" onClick={agregarCliente}>
          Agregar Cliente
        </button>
      </div>

      <ul>
        {clientes.map((c) => (
          <li key={c.id}>{c.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
