import axios from "axios";

// Crear instancia de axios con la base URL de tu backend
const api = axios.create({
  baseURL: "http://localhost:8000"
});

// Interceptor para agregar token a todas las solicitudes si existe
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Función para hacer login
export const login = async (username, password) => {
  const form = new URLSearchParams();
  form.append("username", username);
  form.append("password", password);

  const response = await api.post("/auth/login", form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  if (response.data.access_token) {
    localStorage.setItem("token", response.data.access_token);
  }

  return response.data;
};


// Otras funciones de la API
export const getClientes = async () => {
  const response = await api.get("/clientes/");
  return response.data;
};

export const getProductos = async () => {
  const response = await api.get("/productos/");
  return response.data;
};

// Exportar la instancia por si quieres usarla directamente
export default api;
