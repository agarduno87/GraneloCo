import { useEffect, useState } from "react"
import api from "../api"

export default function Ventas() {
  const [ventas, setVentas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const res = await api.get("/ventas/")
        setVentas(res.data)
      } catch (err) {
        console.error(err)
        setError("No se pudieron cargar las ventas")
      } finally {
        setLoading(false)
      }
    }

    fetchVentas()
  }, [])

  if (loading) return <p>Cargando ventas…</p>
  if (error) return <p>{error}</p>

  return (
    <div className="page-container">
      <h1>Ventas</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente ID</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id}>
              <td>{venta.id}</td>
              <td>{venta.cliente_id}</td>
              <td>${venta.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
