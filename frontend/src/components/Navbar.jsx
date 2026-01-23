import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "1rem", background: "#007BFF", color: "white" }}>
      <Link to="/" style={{ marginRight: 10 }}>Dashboard</Link>
      <Link to="/productos" style={{ marginRight: 10 }}>Productos</Link>
      <Link to="/clientes" style={{ marginRight: 10 }}>Clientes</Link>
      <Link to="/ventas" style={{ marginRight: 10 }}>Ventas</Link>
      <button onClick={logout} style={{ marginLeft: 20 }}>Logout</button>
    </nav>
  );
}
