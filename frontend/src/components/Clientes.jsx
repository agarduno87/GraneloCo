// tu código actual ya funciona,
// sólo evitamos NaN y hacemos JSON en post
import React from "react";
import api from "../api";
import Modal from "./Modal";
import { useState, useEffect } from "react";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [clienteForm, setClienteForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });
  const [modalOpen, setModalOpen] = useState(false);

  async function fetchClientes() {
    const res = await api.get("/clientes");
    setClientes(res.data);
  }

  useEffect(() => {
    fetchClientes();
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    await api.post("/clientes", clienteForm);
    setModalOpen(false);
    fetchClientes();
  }

  return (
    <div>
      {/* tu JSX aquí */}
    </div>
  );
}
