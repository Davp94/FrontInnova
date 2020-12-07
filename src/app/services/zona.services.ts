import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
  })
  export class ZonaService {
      environmentUrl = '';
      constructor( private http: HttpClient ) {
      this.environmentUrl = environment.wsBackend;
    }
    listaZonas(){
      return this.http.get(this.environmentUrl + '/zonas');
    }
  }
