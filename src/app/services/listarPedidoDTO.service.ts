import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
  export class ListarPedidoDTOService {
      environmentUrl = '';
      endpoint = '/pedidos';
      constructor( private http: HttpClient ) {
      this.environmentUrl = environment.wsBackend;
    }
    listaPedidoDTO() {
      return this.http.get(this.environmentUrl + this.endpoint);
    }
  }