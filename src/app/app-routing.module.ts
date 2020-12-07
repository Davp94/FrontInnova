import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './auth/login/login.component';
import { ClaveComponent } from './auth/clave/clave.component';
import { AuthGuardService as AuthGuard } from './auth/service/auth-guard.service';
import { AduanasComponent } from './pages/aduanas/aduanas.component';
import { RegistrarPedidoComponent } from './pages/registrar-pedido/registrar-pedido.component';
import { ListaPedidosComponent } from './pages/lista-pedidos/lista-pedidos.component'; 


const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario/clave',
    component: ClaveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'opcion/prueba1',
    component: AduanasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'opcion/registrar',
    component: RegistrarPedidoComponent
  },
  {
    path: 'opcion/listaPedidos',
    component: ListaPedidosComponent
  }
  ,
  {
    path: '**', pathMatch: 'full', redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
