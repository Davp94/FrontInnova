import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioInterface } from '../../auth/interface/usuario.interface';
import { DataService } from '../../auth/service/data.service';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: UsuarioInterface ;

  constructor( private router: Router,
               private data: DataService,
               private auth: AuthService) {
    this.usuario = data.getUsuario();
    if (!this.usuario){
      this.usuario = {} as any;
    }
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout();
  }

  toggleClass() {
    document.getElementById("wrapper").classList.toggle("toggled");
  }

}
