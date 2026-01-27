import { useEffect, useState } from "react"
import api from "../api"

export default function Ventas() {
  const [ventas, setVentas] = useState([])
  const [clienteId, setClienteId] = useState("")
  const [productoId, setProductoId] = useState("")
  const [cantidad, setCantidad] = useState("")

  const loadVentas = async () => {
    const res = await api.get("/ventas/")
    setVentas(res.data)
  }

  const crearVenta = async () => {
    await api.post("/ventas/", {
      cliente_id: Number(clienteId),
      producto_id: Number(productoId),
      cantidad: Number(cantidad),
    })
    loadVentas()
  }

  useEffect(() => {
    loadVentas()
  }, [])

  return (
    <>
      <h2>Ventas</h2>

      <input placeholder="Cliente ID" value={clienteId} onChange={e => setClienteId(e.target.value)} />
      <input placeholder="Producto ID" value={productoId} onChange={e => setProductoId(e.target.value)} />
      <input placeholder="Cantidad (kg)" value={cantidad} onChange={e => setCantidad(e.target.value)} />
      <button onClick={crearVenta}>Crear Venta</button>

      <ul>
        {ventas.map(v => (
          <li key={v.id}>
            Cliente {v.cliente_id} → Producto {v.producto_id} → {v.cantidad} kg
          </li>
        ))}
      </ul>
    </>
  )
}
