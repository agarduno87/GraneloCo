import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await login(username, password); // 👈 AQUÍ
      navigate("/ventas");             // 👈 O "/" según tu router
    } catch (e) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <input
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={submit}>Entrar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
