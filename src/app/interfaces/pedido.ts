import { Cliente } from './cliente'
import { Detalle } from './detalle'

export interface Pedido {
    direccion: string;
    idRepartidor: number;
    idZona: number;
    fechaHora: string;
    cliente: Cliente;
    detalle: Detalle;
}