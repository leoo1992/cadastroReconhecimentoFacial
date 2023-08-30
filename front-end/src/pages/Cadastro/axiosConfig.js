import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/cadastro",
});

export default api;
