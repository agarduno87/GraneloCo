import { useEffect, useState } from "react"
import api from "../api"

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")

  const loadClientes = async () => {
    const res = await api.get("/clientes/")
    setClientes(res.data)
  }

  const crearCliente = async () => {
    await api.post("/clientes/", { nombre, email })
    setNombre("")
    setEmail("")
    loadClientes()
  }

  useEffect(() => {
    loadClientes()
  }, [])

  return (
    <>
      <h2>Clientes</h2>

      <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={crearCliente}>Crear Cliente</button>

      <ul>
        {clientes.map(c => (
          <li key={c.id}>{c.nombre} — {c.email}</li>
        ))}
      </ul>
    </>
  )
}
