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
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-registrar-pedido',
  templateUrl: './registrar-pedido.component.html',
  styleUrls: ['./registrar-pedido.component.css']
})
export class RegistrarPedidoComponent implements OnInit {
  zonas: Zona[] = [];
  productos: Producto[] = [];
  registroForm: FormGroup;
  cliente: Cliente = {  ci: '', nombres: '', apellidos: '', telefono: '',  nit: '', latitud: 0, longitud: 0};
  detalle: Detalle = { cantidad: 0, idProducto: 1, precioProducto: 0};
  pedido: Pedido = { direccion: '', idRepartidor: 1, idZona: 1, fechaHora: '',
                     cliente: {  ci: '', nombres: '', apellidos: '', telefono: '',  nit: '', latitud: 0, longitud: 0},
                     detalle: { cantidad: 0, idProducto: 1, precioProducto: 0} };
  constructor(private zonaService: ZonaService,
              private productoService: ProductoService,
              private formBuilder: FormBuilder,
              private registrarPedidoService: RegistrarPedidoService,
              private spinner: NgxSpinnerService
              ) { }

  ngOnInit(): void {
    this.listaZonas();
    this.listaProductos();
    this.createForm(); 
  }
  createForm(): void {
    this.registroForm = this.formBuilder.group({
      direccion: ['', [Validators.required, Validators.pattern(/^([a-zA-Z\s]{10,100})\sNRO.\s([0-9]{1,4})$/)]],
      idZona: ['', Validators.required],
      nombres:  [, [Validators.required, Validators.pattern(/^[A-Za-z\s]{1,20}$/)]],
      apellidos: ['', [Validators.required,Validators.pattern(/^[A-Za-z\s]{1,50}$/)]],
      telefono: [, [Validators.required, Validators.pattern(/(^[6-7]{1}[0-9]{7}$)|(^[2-4]{1}[0-9]{6}$)/)]],
      ci:  ['', [Validators.required, Validators.pattern(/^([0-9]{6,9})([a-zA-Z]{1})?$/)]],
      idProducto: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.pattern(/^[1-5]$/)]]
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
    this.spinner.show();
    this.pedido.direccion = this.registroForm.value.direccion;
    this.pedido.idRepartidor = 1;
    this.pedido.idZona = Number(this.registroForm.value.idZona);
    this.pedido.fechaHora = '2020-11-21T21:10:54.722Z';
    this.cliente.ci = this.registroForm.value.ci;
    this.cliente.nombres = this.registroForm.value.nombres;
    this.cliente.apellidos = this.registroForm.value.apellidos;
    this.cliente.telefono = this.registroForm.value.telefono;
    this.cliente.nit=this.registroForm.value.ci;
    this.cliente.latitud=1;
    this.cliente.longitud=1;
    this.detalle.cantidad = Number(this.registroForm.value.cantidad);
    this.detalle.idProducto = Number(this.registroForm.value.idProducto);
    this.detalle.precioProducto = 15;
    this.pedido.cliente = this.cliente;
    this.pedido.detalle = this.detalle;
    console.log(this.pedido);
    this.registrarPedidoService.registrarPedido(this.pedido)
      .subscribe( (resp: PedidoResponse) => {
        if (resp)
        {
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
            if (resp.respuesta.estado === 200) {
              swal.fire({
                icon: 'info',
                title:'Confirmacion de registro',
                html: 'Su pedido ha sido correctamente registrado'+
                      '<br>'+'cliente: ' +this.cliente.nombres + 
                      '<br>'+'Direccion: ' +this.pedido.direccion+
                      '<br>'+'Nro Botellones: ' + this.detalle.cantidad
              }) 
            } else{
              
            }
        }, 5000);
        }
      },
      (error) => {
        this.spinner.hide();
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
