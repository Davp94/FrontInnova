import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';

import { LoginRequest } from '../interface/login-request.interface';
import { LoginResponse } from '../interface/login-response.interface';
import { ErrorResponse } from '../interface/error-response.interface';
import { ClaveRequest } from '../interface/clave-request.interface';
import { UsuarioInterface } from '../interface/usuario.interface';
import { OpcionInterface } from '../interface/opcion.interface';
import { AduanaInterface } from '../interface/aduana.interface';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  usr: string;
  usuario: UsuarioInterface;
  opcion: OpcionInterface[];
  aduana: AduanaInterface[];
  detalleError: ErrorResponse;
  authUrl = '';

  constructor( private httpClient: HttpClient,
               private dataService: DataService,
               public jwtHelper: JwtHelperService,
               private router: Router) { 
    this.authUrl = environment.wsAuth;
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.authUrl}/login`, request)
      .pipe(
        tap( (res: LoginResponse) => {
          if (res) {
            this.saveToken(res.content.token);
            this.saveUsuario(request.usuario);
            this.opcion = res.content.opciones;
            this.aduana = res.content.aduanas;
            delete res.content.token;
            delete res.content.sistema;
            delete res.content.opciones;
            delete res.content.aduanas;
            this.usuario = res.content;
            this.dataService.setUsuario(this.usuario);
            this.dataService.setOpcion(this.opcion);
            this.dataService.setAduana(this.aduana);
          }
        })
      )
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  public getToken(): string {
    if( !this.token ) {
      this.token = localStorage.getItem("token");
    }
    return this.token;
  }

  public getUsuario(): string {
    if( !this.usr ) {
      this.usr = localStorage.getItem("usr");
    }
    return this.usr;
  }

  private saveToken (token: string): void {
    localStorage.setItem("token", token);
  }

  private saveUsuario (usuario: string): void {
    localStorage.setItem("usr", usuario);
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  public cambiaPassword(req: ClaveRequest) {
    return this.httpClient.post(this.authUrl + '/cambiarClave', req);
  }
}
