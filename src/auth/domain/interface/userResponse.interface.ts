export interface UserRegister {
  statusCode: number;
  message: string;
  data: User | User[];
}

export interface User {
  id: number;
  nombre: string;
  email: string;
  estrato_socioeconomico: number;
  rol: string;
  status: boolean;
}
