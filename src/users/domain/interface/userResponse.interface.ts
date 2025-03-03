import { LoginResponse } from 'src/auth/domain/interface/loginResponse.interface';

export interface UserResponse {
  statusCode: number;
  message: string;
  data?: User | User[] | LoginResponse;
}

interface User {
  id: number;
  nombre: string;
  email: string;
  estrato_socioeconomico: number;
  rol: string;
  status: boolean;
}
