import { Component, OnInit } from '@angular/core';
import { PedidoDTO } from 'src/app/interfaces/pedidoDTO';
import { Cliente } from 'src/app/interfaces/cliente';
import { Detalle } from 'src/app/interfaces/detalle';
import { PedidoDTOResponse } from 'src/app/interfaces/pedidoDTO-response';
import {ListarPedidoDTOService} from 'src/app/services/listarPedidoDTO.service'
@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {

  pedidosDTO: PedidoDTO[]=[];
  cliente: Cliente;
  detalle: Detalle;
  constructor(private listarPedidoDTOService: ListarPedidoDTOService) { 
    
  }
  ngOnInit() {
    this.listarPedidoDTOService.listaPedidoDTO()
    .subscribe(
     (resp: PedidoDTOResponse) => {
       this.pedidosDTO = resp.pedidos;
        
      }
      //pedidos => this.pedidos = pedidos
    );
  }
  
  

}
