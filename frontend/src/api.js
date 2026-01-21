import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// Clientes
export const getClientes = async () => {
  try {
    const response = await axios.get(`${API_URL}/clientes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching clientes:", error);
    return [];
  }
};

// Productos
export const getProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching productos:", error);
    return [];
  }
};

// Ventas
export const getVentas = async () => {
  try {
    const response = await axios.get(`${API_URL}/ventas`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ventas:", error);
    return [];
  }
};

export default {
  getClientes,
  getProductos,
  getVentas,
};
