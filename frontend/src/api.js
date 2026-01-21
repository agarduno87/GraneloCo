import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// CLIENTES
export const getClientes = () => api.get("/clientes");
export const postCliente = (cliente) => api.post("/clientes", cliente);

// PRODUCTOS
export const getProductos = () => api.get("/productos");
export const postProducto = (producto) => api.post("/productos", producto);

// VENTAS
export const getVentas = () => api.get("/ventas");
export const postVenta = (venta) => api.post("/ventas", venta);

// STATS
export const getVentasStats = () => api.get("/ventas/stats");
