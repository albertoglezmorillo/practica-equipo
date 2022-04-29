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
  prueba: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  clientes: cliente[] = [];
  clienteSeleccionado: cliente = new cliente({});
  hola: boolean = true;

  bandera: boolean = true;
  mostrar:boolean = true;


  status: string = '';




  filtros = {
    alias: '',
    activo: '',
    provincia: '',
    documento: '',
    codigo: '',
  };

  constructor(public clienteSvc: ClienteService) {
    this.clienteSvc.getCliente(this.filtros).subscribe(
      (data) => {

        this.clientes = data.data.map((valor: any) => new cliente(valor));
        this.ordenarPorId();
        this.clienteSeleccionado = this.clientes[0];
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }



  ordenarPorId() {

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

  cambioCodigo(valor: any) {
    this.filtros.codigo = valor;
  }
  cambioAlias(valor: any) {
    this.filtros.alias = valor;
  }
  cambioProvincia(valor: any) {
    this.filtros.provincia = valor;
  }
  cambioDocumento(valor: any) {
    this.filtros.documento = valor;
  }

  cambioFiltroActivo(valor: any) {
    this.filtros.activo = valor;
  }

  mostrarSeleccionado(item: cliente) {

    this.clienteSeleccionado = Object.assign(cliente, item);
    this.bandera = false;


  }



  buscar() {

    console.log("Num cliente del input", this.filtros.codigo)
    console.log('valores de filtro', this.filtros)

    this.clienteSvc.getCliente(this.filtros).subscribe(
      (data) => { console.log(data); this.clientes = data.data; this.ordenarPorId(); },
      (error) => { alert("Los datos no han podido cargarse"); }
    )

  }


  recargarDatos() {
    this.clienteSvc.getCliente(this.filtros).subscribe(
      (data) => {
        console.log(data);

        this.clientes = data.data.map((valor: any) => new cliente(valor))

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
  setInput(valor: any, tipo: string) {


    switch (tipo) {
      case 'documento':
        this.clienteSeleccionado.documento = valor
        break;
      case 'alias':
        this.clienteSeleccionado.alias = valor
        break;
      case 'nombre':
        this.clienteSeleccionado.nombre = valor
        break;
      case 'notas':
        this.clienteSeleccionado.notas = valor
        break;
      case 'direccion':
        this.clienteSeleccionado.direccion = valor
        break;
      case 'poblacion':
        this.clienteSeleccionado.poblacion = valor
        break;
      case 'provincia':
        this.clienteSeleccionado.provincia = valor
        break;
      case 'codigo_postal':
        this.clienteSeleccionado.codigo_postal = valor
        break;
      case 'telefono':
        this.clienteSeleccionado.telefono = valor
        break;
      case 'comercial':
        this.clienteSeleccionado.comercial = valor
        break;
      case 'email':
        this.clienteSeleccionado.email = valor
        break;
      case 'razon_social':
        this.clienteSeleccionado.razon_social = valor
        break;

      case 'activo':
        this.clienteSeleccionado.activo = (valor == '1') ? true : false
        break;
    }
  }
  modificarPersonales() {

    let datosInput = {
      idcliente: this.clienteSeleccionado.idcliente,

      alias: this.clienteSeleccionado.alias,
      nombre: this.clienteSeleccionado.nombre,
      documento: this.clienteSeleccionado.documento,
      notas: this.clienteSeleccionado.notas,

    }

    console.log('datos de datosInput', datosInput)
    this.clienteSvc.updateCliente(datosInput).subscribe(
      (data) => { this.recargarDatos() },
      (error) => { alert("no ha funcionado") }
    )

  }
  modificarContacto() {

    let datosInput = {
      idcliente: this.clienteSeleccionado.idcliente,

      
      email: this.clienteSeleccionado.email,
      direccion: this.clienteSeleccionado.direccion,
     
      razon_social: this.clienteSeleccionado.razon_social,
      provincia: this.clienteSeleccionado.provincia,
      codigo_postal: this.clienteSeleccionado.codigo_postal,
      localidad: this.clienteSeleccionado.localidad,
      telefono: this.clienteSeleccionado.telefono,
      comercial: this.clienteSeleccionado.comercial,
      
      activo: this.clienteSeleccionado.activo
    }

    console.log('datos de datosInput', datosInput)
    this.clienteSvc.updateCliente(datosInput).subscribe(
      (data) => { this.recargarDatos() },
      (error) => { alert("no ha funcionado") }
    )

  }
}
