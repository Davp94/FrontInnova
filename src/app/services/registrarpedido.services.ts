import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pedido } from '../interfaces/pedido';

@Injectable({
    providedIn: 'root'
  })
  export class RegistrarPedidoService {
      environmentUrl = '';
      constructor( private http: HttpClient ) {
      this.environmentUrl = environment.wsBackend;
    }
    registrarPedido(pedido: Pedido): any {
        // console.log(solicitud);
        return this.http.post(this.environmentUrl + '/pedidos', pedido);
    }
  }
