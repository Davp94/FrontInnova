import { Component, OnInit } from '@angular/core';
import { DataService } from '../../auth/service/data.service';
import { OpcionInterface } from '../../auth/interface/opcion.interface';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  opciones: OpcionInterface[];
  menu: string = "fa-buffer";

  constructor( private data: DataService,
               private auth: AuthService) { 
    this.opciones = this.data.getOpcion();
    if ( this.opciones === null ) {
       this.auth.logout();
    }
  }

  ngOnInit(): void {
  }

}
