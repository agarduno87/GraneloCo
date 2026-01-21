import React, { useEffect, useState } from "react";
import { getClientes, postCliente } from "../api";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState("");

  const fetchClientes = async () => {
    const res = await getClientes();
    setClientes(res.data);
  };

  useEffect(() => { fetchClientes(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postCliente({ nombre });
    setNombre("");
    fetchClientes();
  };

  return (
    <div>
      <h2>Clientes</h2>
      <form onSubmit={handleSubmit}>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
        <button className="bg-blue-500 text-white p-2 rounded">Agregar Cliente</button>
      </form>
      <ul>
        {clientes.map(c => <li key={c.id}>{c.nombre}</li>)}
      </ul>
    </div>
  );
}
