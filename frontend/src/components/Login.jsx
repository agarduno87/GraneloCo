// src/components/Login.jsx
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const form = new URLSearchParams();
      form.append("username", username);
      form.append("password", password);

      const response = await api.post("/auth/login", form, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      console.log("LOGIN OK:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setToken(response.data);

      console.log("TOKEN seteado en App:", response.data);
      console.log("LocalStorage ahora tiene:", localStorage.getItem("user"));

      // Redirige a Dashboard
      //navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "FF Providence Sans, sans-serif",
        backgroundColor: "#f5f5f5",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: "320px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2 style={{ color: "#004aad", textAlign: "center" }}>Login</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#004aad",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Entrar
        </button>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      </form>
    </div>
  );
}
