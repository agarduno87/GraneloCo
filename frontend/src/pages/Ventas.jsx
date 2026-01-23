import { useEffect, useState } from "react";
import api from "../api";

export default function Ventas() {
  const [ventas,setVentas] = useState([]);
  const [clienteId,setClienteId] = useState("");
  const [total,setTotal] = useState("");
  const [error,setError] = useState("");

  const cargar = () => api.get("/ventas").then(r=>setVentas(r.data));
  useEffect(cargar, []);

  const crear = () => {
    if(!clienteId || !total || total<=0){
      setError("Cliente y total deben ser válidos");
      return;
    }
    api.post("/ventas",{cliente_id:+clienteId,total:+total})
      .then(()=>{ setError(""); cargar(); })
      .catch(()=>setError("Error al registrar venta"));
  };

  return (
    <div style={{padding:20}}>
      <h2>Ventas</h2>
      <input placeholder="Cliente ID" type="number" onChange={e=>setClienteId(e.target.value)}/>
      <input placeholder="Total" type="number" onChange={e=>setTotal(e.target.value)}/>
      <button onClick={crear}>Registrar</button>
      {error && <p style={{color:"red"}}>{error}</p>}
      <ul>
        {ventas.map(v => <li key={v.id}>Venta #{v.id} - ${v.total} (Cliente ID: {v.cliente_id})</li>)}
      </ul>
    </div>
  );
}
