import { useEffect, useState } from "react"
import api from "../api"

export default function Productos() {
  const [productos, setProductos] = useState([])
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState("")
  const [stock, setStock] = useState("")

  const loadProductos = async () => {
    const res = await api.get("/productos/")
    setProductos(res.data)
  }

  const crearProducto = async () => {
    await api.post("/productos/", {
      nombre,
      precio: Number(precio),
      stock: Number(stock),
    })
    setNombre("")
    setPrecio("")
    setStock("")
    loadProductos()
  }

  useEffect(() => {
    loadProductos()
  }, [])

  return (
    <>
      <h2>Productos</h2>

      <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input placeholder="Precio por kg" value={precio} onChange={e => setPrecio(e.target.value)} />
      <input placeholder="Stock (kg)" value={stock} onChange={e => setStock(e.target.value)} />
      <button onClick={crearProducto}>Crear Producto</button>

      <ul>
        {productos.map(p => (
          <li key={p.id}>
            {p.nombre} — ${p.precio} — {p.stock} kg
          </li>
        ))}
      </ul>
    </>
  )
}
