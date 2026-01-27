import { useEffect, useState } from "react"
import api from "../api"

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await api.get("/clientes/")
        setClientes(res.data)
      } catch (err) {
        console.error(err)
        setError("No se pudieron cargar los clientes")
      } finally {
        setLoading(false)
      }
    }

    fetchClientes()
  }, [])

  if (loading) return <p>Cargando clientes…</p>
  if (error) return <p>{error}</p>

  return (
    <div className="page-container">
      <h1>Clientes</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
