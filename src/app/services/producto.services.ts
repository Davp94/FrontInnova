import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
  })
  export class ProductoService {
      environmentUrl = '';
      constructor( private http: HttpClient ) {
      this.environmentUrl = environment.wsBackend;
    }
    listaProductos() {
      return this.http.get(this.environmentUrl + '/productos');
    }
  }
