import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  sistema: string;
  plataforma: string;

  constructor( private authService: AuthService,
               private router: Router) { 
    this.sistema = environment.app;
    this.plataforma = environment.plataforma;
  }

  ngOnInit(): void {
  }

  onLogin (form): void {
    form.value.sistema = this.sistema;
    form.value.origen = this.plataforma;

    this.authService.login (form.value).subscribe( res => {
      this.router.navigateByUrl('/inicio');
    });
  }

}
