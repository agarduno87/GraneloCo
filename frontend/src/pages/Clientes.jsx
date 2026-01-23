import { useEffect, useState } from "react";
import api from "../api";

export default function Clientes() {
  const [items,setItems] = useState([]);
  const [nombre,setNombre] = useState("");
  const [email,setEmail] = useState("");
  const [error,setError] = useState("");

  const cargar = () => api.get("/clientes").then(r=>setItems(r.data));
  useEffect(cargar, []);

  const crear = () => {
    if(!nombre || !email){
      setError("Todos los campos son obligatorios");
      return;
    }
    api.post("/clientes",{nombre,email})
      .then(()=>{ setError(""); cargar(); })
      .catch(()=>setError("Error al crear cliente"));
  };

  return (
    <div style={{padding:20}}>
      <h2>Clientes</h2>
      <input placeholder="Nombre" onChange={e=>setNombre(e.target.value)}/>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
      <button onClick={crear}>Crear</button>
      {error && <p style={{color:"red"}}>{error}</p>}
      <ul>
        {items.map(c => <li key={c.id}>{c.nombre} ({c.email})</li>)}
      </ul>
    </div>
  );
}
