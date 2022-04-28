import { Component } from '@angular/core';
import { cliente } from './models/cliente.model';
import { ClienteService } from './services/cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'practica-equipo';
  prueba:any = [1,2,3,4,5,6,7,8,9,10];
  clientes: cliente[]= [];
  clienteSeleccionado: cliente=new cliente({});


  numCliente: number = this.clienteSeleccionado.numero;
  alias: string = this.clienteSeleccionado.alias;
  nombre: string = this.clienteSeleccionado.nombre;
  email: string = this.clienteSeleccionado.email;
  direccion: string = this.clienteSeleccionado.direccion;
  documento: string = this.clienteSeleccionado.documento;
  razonSocial: string = this.clienteSeleccionado.razon_social;
  provincia: string = this.clienteSeleccionado.provincia;
  cp: number = this.clienteSeleccionado.codigo_postal;
  localidad: string = this.clienteSeleccionado.localidad;
  telefono: number = this.clienteSeleccionado.telefono;
  comercial: string = this.clienteSeleccionado.comercial;
  notas: string = this.clienteSeleccionado.notas;
  activob: boolean = true;

  status: string = '';


  
  filtros = {
    alias: '',
    activo: '',
    provincia: '',
    documento: '',
    codigo: '',
  };

  constructor(public clienteSvc:ClienteService){
    this.clienteSvc.getCliente(this.filtros).subscribe(
      (data) => {

        this.clientes = data.data;
        this.ordenarPorId();
        this.clienteSeleccionado=this.clientes[0];
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }
  ordenarPorId(){
    this.clientes.sort(function (a: cliente, b: cliente) {
      if (a.alias > b.alias) {
        return 1;
      }
      if (a.alias < b.alias) {
        return -1;
      }
      return 0;
    });
  }

  mostrarSeleccionado(item: cliente) {

    this.clienteSeleccionado = item;
    this.reiniciarValores();
    console.log("cliente seleccionado",this.clienteSeleccionado);

  }
  buscar() {

    console.log("Num cliente del input",this.filtros.codigo)
    console.log('valores de filtro',this.filtros)

    this.clienteSvc.getCliente(this.filtros).subscribe(
      (data) => { console.log(data); this.clientes = data.data; this.ordenarPorId(); },
      (error) => { alert("Los datos no han podido cargarse"); }
    )

  }
  reiniciarValores(){
    this.numCliente = this.clienteSeleccionado.numero;
    this.alias = this.clienteSeleccionado.alias;
    this.nombre = this.clienteSeleccionado.nombre;
    this.email = this.clienteSeleccionado.email;
    this.direccion = this.clienteSeleccionado.direccion;
    this.documento = this.clienteSeleccionado.documento;
    this.razonSocial = this.clienteSeleccionado.razon_social;
    this.provincia = this.clienteSeleccionado.provincia;
    this.cp = this.clienteSeleccionado.codigo_postal;
    this.localidad = this.clienteSeleccionado.localidad;
    this.telefono = this.clienteSeleccionado.telefono;
    this.comercial = this.clienteSeleccionado.comercial;
    this.notas = this.clienteSeleccionado.notas;
    this.activob = true;
  }
  
  recargarDatos() {
    let filtros = {
      alias: '',
      activo: '',
      provincia: '',
      documento: '',
      codigo: ''
    }
    this.clienteSvc.getCliente(filtros).subscribe(
      (data) => {
        console.log(data);

        this.clientes = data.data;

        this.ordenarPorId();
        this.clienteSeleccionado = this.clientes[0]
      },
      (error) => { alert("Los datos no han podido cargarse"); }

    )
  }

  eliminar() {
    let usuarioAborrar = {
      id: this.clienteSeleccionado.idcliente
    }
    console.log(this.clienteSeleccionado.idcliente)
    this.clienteSvc.deleteCliente(usuarioAborrar).subscribe(
      (data) => { this.recargarDatos() },
      (error) => {
        alert(error.mensaje);
      }
    )
  }
  
  modificar() {
    
    
    let datosInput = {
      idcliente: this.clienteSeleccionado.idcliente,

      alias: this.alias,
      nombre: this.nombre,
      email: this.email,
      direccion: this.direccion,
      documento: this.documento,
      razon_social: this.razonSocial,
      provincia: this.provincia,
      codigo_postal: this.cp,
      localidad: this.localidad,
      telefono: this.telefono,
      comercial: this.comercial,
      notas: this.notas,
      activo: this.activob
    }
    console.log('cliente modificado')
   console.log('datos de datosInput',datosInput)
    this.clienteSvc.updateCliente(datosInput).subscribe(
      (data) => {this.reiniciarValores(), this.recargarDatos()  },
      (error) => { alert("no ha funcionado") }
    )
    
  }
}
