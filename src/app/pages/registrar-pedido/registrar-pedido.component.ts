import { Component, OnInit } from '@angular/core';
import { Zona } from 'src/app/interfaces/zona';
import { ZonaResponse } from 'src/app/interfaces/zona-response';
import { ProductoResponse } from 'src/app/interfaces/producto-response';
import { ProductoService } from 'src/app/services/producto.services';
import { ZonaService } from 'src/app/services/zona.services';
import { Producto } from 'src/app/interfaces/producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedido } from 'src/app/interfaces/pedido';
import { Cliente } from 'src/app/interfaces/cliente';
import { Detalle } from 'src/app/interfaces/detalle';
import { RegistrarPedidoService } from 'src/app/services/registrarpedido.services';
import { PedidoResponse } from 'src/app/interfaces/pedido-response';
import swal from 'sweetalert2';
@Component({
  selector: 'app-registrar-pedido',
  templateUrl: './registrar-pedido.component.html',
  styleUrls: ['./registrar-pedido.component.css']
})
export class RegistrarPedidoComponent implements OnInit {
  zonas: Zona[] = [];
  productos: Producto[] = [];
  registroForm: FormGroup;
  cliente: Cliente = { idCliente: 1, ci: '', nombres: '', apellidos: '', telefono: '',  nit: '', latitud: 0, longitud: 0};
  detalle: Detalle = { cantidad: 0, idProducto: 1, precioProducto: 0};
  pedido: Pedido = { direccion: '', idRepartidor: 1, idZona: 1, fechaHora: '',
                     cliente: { idCliente: 1, ci: '', nombres: '', apellidos: '', telefono: '',  nit: '', latitud: 0, longitud: 0},
                     detalle: { cantidad: 0, idProducto: 1, precioProducto: 0} };
  constructor(private zonaService: ZonaService,
              private productoService: ProductoService,
              private formBuilder: FormBuilder,
              private registrarPedidoService: RegistrarPedidoService
              ) { }

  ngOnInit(): void {
    this.listaZonas();
    this.listaProductos();
    this.createForm(); 
  }
  createForm(): void {
    this.registroForm = this.formBuilder.group({
      direccion: ['', Validators.required],
      idZona: ['', Validators.required],
      nombres:  [, [Validators.required]],
      apellidos: ['', [Validators.required]],
      telefono: [, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      ci:  ['', Validators.required],
      idProducto: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]]
    });
  }
  listaZonas(): void {
    this.zonaService.listaZonas()
      .subscribe(
        (resp: ZonaResponse) => {
          this.zonas = resp.zonas;
          console.log(this.zonas);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  listaProductos(): void {
    this.productoService.listaProductos()
      .subscribe(
        (resp: ProductoResponse) => {
          this.productos = resp.productos;
          console.log(this.zonas);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  guardar(): void{
    // this.pedido = this.registroForm.value;
    //this.cliente = this.registroForm.value;
    //this.detalle = this.registroForm.value;
    this.pedido.direccion = this.registroForm.value.direccion;
    this.pedido.idZona = Number(this.registroForm.value.idZona);
    this.pedido.idRepartidor = 1;
    this.pedido.fechaHora = '2020-11-21T21:10:54.722Z';
    this.cliente.idCliente = 1;
    this.cliente.ci = this.registroForm.value.ci;
    this.cliente.nombres = this.registroForm.value.nombres;
    this.cliente.apellidos = this.registroForm.value.apellidos;
    this.cliente.telefono = this.registroForm.value.telefono;
    this.detalle.cantidad = Number(this.registroForm.value.cantidad);
    this.detalle.idProducto = Number(this.registroForm.value.idProducto);
    this.pedido.cliente = this.cliente;
    this.pedido.detalle = this.detalle;
    console.log(this.pedido);
    this.registrarPedidoService.registrarPedido(this.pedido)
      .subscribe( (resp: PedidoResponse) => {
        if (resp)
        {
          swal.fire({
            icon: 'info',
            title:'Confirmacion de registro',
            text: 'Su pedido ha sido correctamente registrado \n'
                  +this.cliente.nombres + ' \n' + this.pedido.direccion
                  + ' \n' + this.detalle.cantidad
          })
          if (resp.respuesta.estado === 200) {
            alert(resp.respuesta.mensaje);
          } else{
            alert(resp.respuesta.mensaje);
          }
        }
        console.log(resp);
      },
      (error) => {
        alert(error);
        swal.fire({
          icon: 'info',
          title:'Error de registro',
          text: error
        })
        console.log(error);
      });
      
  
  }
}
