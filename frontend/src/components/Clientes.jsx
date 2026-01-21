import React, { useEffect, useState } from "react";
import { getClientes, addCliente } from "../api";
import "./ButtonBlue.css";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    const data = await getClientes();
    setClientes(data);
  };

  const handleAddCliente = async () => {
    if (!nombre) return;
    await addCliente({ nombre });
    setNombre("");
    fetchClientes();
  };

  return (
    <div>
      <h1>Clientes</h1>
      <input value={nombre} placeholder="Nombre Cliente" onChange={e => setNombre(e.target.value)} />
      <button className="btn-blue" onClick={handleAddCliente}>Agregar Cliente</button>
      <ul>
        {clientes.map(c => <li key={c.id}>{c.nombre}</li>)}
      </ul>
    </div>
  );
}
