export interface UserResponse {
  statusCode: number;
  message: string;
  data?: User | User[];
}

interface User {
  id: number;
  nombre: string;
  email: string;
  estrato_socioeconomico: number;
  rol: string;
  status: boolean;
}
