// authService.ts
import axios from 'axios'

interface AuthResponse {
  user: {
    id: number
    username: string
    email: string
    createdAt: string
  }
  token: string
}
interface JwtPayload {
  id: number;
  email: string;
  username: string;
}
export const login = async (email: string, password: string) => {
  const response = await axios.post('/api/auth/login', { email, password })
  return response.data as AuthResponse
}

export const register = async (username: string, email: string, password: string) => {
  const response = await axios.post('/api/auth/register', { username, email, password })
  return response.data as AuthResponse
}