import { Component, HostListener, OnInit } from '@angular/core';
import { cliente } from './models/cliente.model';
import { ClienteService } from './services/cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'practica-equipo';
  prueba: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  clientes: cliente[] = [];
  clienteSeleccionado: cliente = new cliente({});
  hola: boolean = true;
  alto_contenedor_tarjetas:any  = 0;

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
    let padding = 16;
    let numero_columnas = 0;
    let ancho_div = 0;
    let alto_contenedor_cuerpo = 0;

    let div_tarjetas = document.getElementById('contenedor-tarjeta');
    let div_cuerpos = document.getElementById('contenedor-cuerpo');

    //calcula cuanto deberia ser el alto del contenedor de las tarjetas
    if (div_tarjetas !== null && div_cuerpos  !== null) {
      ancho_div = div_tarjetas.offsetWidth;
      alto_contenedor_cuerpo = div_cuerpos.offsetHeight;
      numero_columnas = Math.floor(ancho_div/ancho);
      this.alto_contenedor_tarjetas = (Math.ceil(this.clientes.length/numero_columnas)*alto)+padding;
      
      if(alto_contenedor_cuerpo < this.alto_contenedor_tarjetas)
        this.alto_contenedor_tarjetas = null;
    }
    
    setTimeout(() => {if (ancho_div <= padding)  {
      this.recalcularFilas();
    } }, 100);
  }

  buscar() {

    this.clienteSvc.getCliente(this.filtros).subscribe(
      (data) => {
        console.log(data);
        this.clientes = data.data;
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
        console.log(data);

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
    console.log(this.clienteSeleccionado.idcliente);
    this.clienteSvc.deleteCliente(usuarioAborrar).subscribe(
      (data) => {
        this.recargarDatos();
      },
      (error) => {
        alert(error.mensaje);
      }
    );
  }
  setInput(valor: any, tipo: string) {
    switch (tipo) {
      case 'documento':
        this.clienteSeleccionado.documento = valor;
        break;
      case 'alias':
        this.clienteSeleccionado.alias = valor;
        break;
      case 'nombre':
        this.clienteSeleccionado.nombre = valor;
        break;
      case 'notas':
        this.clienteSeleccionado.notas = valor;
        break;
      case 'direccion':
        this.clienteSeleccionado.direccion = valor;
        break;
      case 'poblacion':
        this.clienteSeleccionado.poblacion = valor;
        break;
      case 'provincia':
        this.clienteSeleccionado.provincia = valor;
        break;
      case 'codigo_postal':
        this.clienteSeleccionado.codigo_postal = valor;
        break;
      case 'telefono':
        this.clienteSeleccionado.telefono = valor;
        break;
      case 'comercial':
        this.clienteSeleccionado.comercial = valor;
        break;
      case 'email':
        this.clienteSeleccionado.email = valor;
        break;
      case 'razon_social':
        this.clienteSeleccionado.razon_social = valor;
        break;

      case 'activo':
        this.clienteSeleccionado.activo = valor == '1' ? true : false;
        break;
    }
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
