import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModuleOptions, JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from './_alert';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ClaveComponent } from './auth/clave/clave.component';
import { AuthInterceptor } from './auth/interceptor/auth.interceptor';
import { ErrorInterceptor } from './auth/interceptor/error.interceptor';
import { AduanasComponent } from './pages/aduanas/aduanas.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RegistrarPedidoComponent } from './pages/registrar-pedido/registrar-pedido.component';
import { ListaPedidosComponent } from './pages/lista-pedidos/lista-pedidos.component';
import { ListarPedidoDTOService} from './services/listarPedidoDTO.service'

const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
    whitelistedDomains: ["http://*.aduana.gob.bo"]
  }
}

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    InicioComponent,
    ClaveComponent,
    AduanasComponent,
    RegistroComponent,
    RegistrarPedidoComponent,
    ListaPedidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    JwtModule.forRoot(JWT_Module_Options)
  ],
  providers: [
    ListarPedidoDTOService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
