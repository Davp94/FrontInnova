import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_alert';
import { ClaveRequest } from '../interface/clave-request.interface';
import { AuthService } from '../service/auth.service';
import { SimpleResponse } from '../interface/simple-response.interface';

@Component({
  selector: 'app-clave',
  templateUrl: './clave.component.html',
  styleUrls: ['./clave.component.css']
})
export class ClaveComponent implements OnInit {

  request: ClaveRequest = {} as any;

  constructor( private alert: AlertService,
               private authService: AuthService) { }

  ngOnInit(): void {
  }

  onClick(form): void {
    if(form.value.nueva === form.value.confirma) {
      this.request.usuario = this.authService.getUsuario();
      this.request.anterior = form.value.actual;
      this.request.nuevo = form.value.nueva;

      this.authService.cambiaPassword(this.request)
          .subscribe( (data: SimpleResponse) => {
            this.alert.success(data.content);
            form.reset();
          });
    } 
    else {
      this.alert.error("Las contraseñas no coinciden, inténtelo nuevamente");
    }
  }
}
