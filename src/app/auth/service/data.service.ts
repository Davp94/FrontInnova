import { Injectable } from '@angular/core';
import { UsuarioInterface } from '../interface/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private usuarioData: string ="usuario";
  private opcionData: string = "opcion";
  private aduanaData: string = "aduana";
  
  constructor() { }

  setUsuario(data: UsuarioInterface) {
    localStorage.setItem(this.usuarioData, JSON.stringify(data));
  }

  getUsuario(): UsuarioInterface {
    let data = localStorage.getItem(this.usuarioData);
    return JSON.parse(data);
  }

  setOpcion(data: any) {
    localStorage.setItem(this.opcionData, JSON.stringify(data));
  }

  getOpcion() {
    let data = localStorage.getItem(this.opcionData);
    return JSON.parse(data);
  }

  setAduana(data: any) {
    localStorage.setItem(this.aduanaData, JSON.stringify(data));
  }

  getAduana() {
    let data = localStorage.getItem(this.aduanaData);
    return JSON.parse(data);
  }
}
