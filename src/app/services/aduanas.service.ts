import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Aduana } from '../interfaces/aduana';
import { SimpleResponse } from '../interfaces/simple-response';

@Injectable({
  providedIn: 'root'
})
export class AduanasService {

  environmentUrl = '';

  constructor( private http: HttpClient ) {
    this.environmentUrl = environment.wsBackend;
  }

  listaAduanas() {
    return this.http.get(this.environmentUrl + '/aduanas');
  }
}
