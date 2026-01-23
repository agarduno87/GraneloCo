import { useEffect, useState } from "react";
import api from "../api";

export default function Productos() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ nombre:"", precio:"", stock:"" });
  const [error, setError] = useState("");

  const cargar = () => api.get("/productos").then(r => setItems(r.data));
  useEffect(cargar, []);

  const crear = () => {
    if(!form.nombre || form.precio<=0 || form.stock<0){
      setError("Todos los campos son obligatorios y válidos");
      return;
    }
    api.post("/productos", { ...form, precio:+form.precio, stock:+form.stock })
      .then(()=>{ setError(""); cargar(); })
      .catch(()=>setError("Error al crear producto"));
  };

  const eliminar = (id) => api.delete(`/productos/${id}`).then(cargar);

  return (
    <div style={{ padding:20 }}>
      <h2>Productos</h2>
      <input placeholder="Nombre" onChange={e=>setForm({...form,nombre:e.target.value})}/>
      <input placeholder="Precio" type="number" onChange={e=>setForm({...form,precio:e.target.value})}/>
      <input placeholder="Stock" type="number" onChange={e=>setForm({...form,stock:e.target.value})}/>
      <button onClick={crear}>Crear</button>
      {error && <p style={{color:"red"}}>{error}</p>}
      <ul>
        {items.map(p => (
          <li key={p.id}>
            {p.nombre} - ${p.precio} (Stock: {p.stock})
            <button onClick={()=>eliminar(p.id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
