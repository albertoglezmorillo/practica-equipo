import { Component, HostListener, OnInit } from '@angular/core';
import { cliente } from './models/cliente.model';
import { ClienteService } from './services/cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
 
 
  clientes: cliente[] = [];
  clienteSeleccionado: cliente = new cliente({});
  
  alto_contenedor_tarjetas:any  = null;

  bandera: boolean = true;
  mostrar: boolean = true;

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
  ngOnInit(): void {
    this.recalcularFilas();
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.recalcularFilas();
  }

  recalcularFilas() {
    let alto = 236;
    let ancho = 346;
    let numero_columnas = 0;
    let ancho_div = 0;

    let div_tarjetas = document.getElementById('contenedor-tarjeta');
    let div_cuerpos = document.getElementById('contenedor-cuerpo');

    //calcula cuanto deberia ser el alto del contenedor de las tarjetas
    if (div_tarjetas !== null && div_cuerpos  !== null) {
      ancho_div = div_tarjetas.offsetWidth;
      numero_columnas = Math.floor(ancho_div/ancho);
      this.alto_contenedor_tarjetas = Math.ceil(this.clientes.length/numero_columnas)*alto;

      if(div_cuerpos.offsetHeight < this.alto_contenedor_tarjetas)
        this.alto_contenedor_tarjetas = null;
    }
    
    setTimeout(() => {if (ancho_div == 0) {
      this.recalcularFilas()
    } }, 100);
  }

  buscar() {

    this.clienteSvc.getCliente(this.filtros).subscribe(
      (data) => {
       
        this.clientes = data.data.map((valor: any) => new cliente(valor));
        this.ordenarPorId();
      },
      (error) => {
        alert('Los datos no han podido cargarse');
      }
    );
  }

  recargarDatos() {
    this.clienteSvc.getCliente(this.filtros).subscribe(
      (data) => {
        

        this.clientes = data.data.map((valor: any) => new cliente(valor));

        this.ordenarPorId();
        this.clienteSeleccionado = this.clientes[0];
      },
      (error) => {
        alert('Los datos no han podido cargarse');
      }
    );
  }

  eliminar() {
    let usuarioAborrar = {
      id: this.clienteSeleccionado.idcliente,
    };
    
    this.clienteSvc.deleteCliente(usuarioAborrar).subscribe(
      (data) => {
        this.recargarDatos();
      },
      (error) => {
        alert(error.mensaje);
      }
    );
  }
 
  modificarPersonales() {
    let datosInput = {
      idcliente: this.clienteSeleccionado.idcliente,
      alias: this.clienteSeleccionado.alias,
      nombre: this.clienteSeleccionado.nombre,
      documento: this.clienteSeleccionado.documento,
      razon_social: this.clienteSeleccionado.razon_social,
      notas: this.clienteSeleccionado.notas,
    };

    this.clienteSvc.updateCliente(datosInput).subscribe(
      (data) => {
        this.recargarDatos();
      },
      (error) => {
        alert('no ha funcionado');
      }
    );
  }
  modificarContacto() {
    let datosInput = {
      idcliente: this.clienteSeleccionado.idcliente,
      email: this.clienteSeleccionado.email,
      direccion: this.clienteSeleccionado.direccion,
      documento: this.clienteSeleccionado.documento,
      provincia: this.clienteSeleccionado.provincia,
      codigo_postal: this.clienteSeleccionado.codigo_postal,
      localidad: this.clienteSeleccionado.localidad,
      telefono: this.clienteSeleccionado.telefono,
      comercial: this.clienteSeleccionado.comercial,
      activo: this.clienteSeleccionado.activo,
    };

    
    this.clienteSvc.updateCliente(datosInput).subscribe(
      (data) => {
        this.recargarDatos();
      },
      (error) => {
        alert('no ha funcionado');
      }
    );
  }
}
