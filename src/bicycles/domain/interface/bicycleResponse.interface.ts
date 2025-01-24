export interface BicycleResponse {
  statusCode: number;
  message: string;
  data?: Bicycle | Bicycle[];
}

interface Bicycle {
  marca: string;
  color: string;
  estado: string;
  precio: number;
}
