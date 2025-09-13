import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

export async function fetchProducts() {
  const res = await axios.get(`${API_BASE}/api/products`)
  return res.data
}
