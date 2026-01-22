import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

/* =========================
   CLIENTES
========================= */

async function getClientes() {
  const res = await axios.get(`${API_URL}/clientes`);
  return res.data;
}

async function postCliente(cliente) {
  const res = await axios.post(`${API_URL}/clientes`, cliente);
  return res.data;
}

/* Alias para compatibilidad (algunos componentes usan addCliente) */
const addCliente = postCliente;

/* =========================
   PRODUCTOS / INVENTARIO
========================= */

async function getProductos() {
  const res = await axios.get(`${API_URL}/productos`);
  return res.data;
}

async function postProducto(producto) {
  const res = await axios.post(`${API_URL}/productos`, producto);
  return res.data;
}

/* =========================
   VENTAS
========================= */

async function getVentas() {
  const res = await axios.get(`${API_URL}/ventas`);
  return res.data;
}

async function postVenta(venta) {
  const res = await axios.post(`${API_URL}/ventas`, venta);
  return res.data;
}

/* =========================
   STATS / DASHBOARD
========================= */

async function getVentasStats() {
  const res = await axios.get(`${API_URL}/ventas/stats`);
  return res.data;
}

/* =========================
   EXPORT DEFAULT (TU MODELO)
========================= */

export default {
  // clientes
  getClientes,
  postCliente,
  addCliente,

  // productos
  getProductos,
  postProducto,

  // ventas
  getVentas,
  postVenta,

  // dashboard
  getVentasStats,
};
