import { Cliente } from './cliente'
import { Detalle } from './detalle'
export interface PedidoDTO{

    direccion:string;
    idRepartidor:number;
    idZona:number;
    nombreZona:string;
    fechaHora:string;
    cliente:Cliente;
    detalle:Detalle;
    estado:string;
}