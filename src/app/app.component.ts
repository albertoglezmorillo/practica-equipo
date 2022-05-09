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
  clienteMarcado: cliente = new cliente({});
  clienteCrear: cliente = new cliente({});
  alto_contenedor_tarjetas:any  = 0;
  mostrarModalCrear = false;
  mostrarModalBorrar = false;

  status: string = '';
  tituloCreacion:string = 'Crear Cliente';
  subtituloCreacion:Array<Array<string>> = [['Datos Personales','0'],['Datos de Contacto','4']];
  labelsCreacion:Array<Array<string>> = [['Numero de cliente','Documento:'],
                                        ['Nombre:'],
                                        ['Alias:'],
                                        ['Direccion:'],
                                        ['Poblacion:','Provincia:','Codigo Postal:'],
                                        ['Telefono:','Comercial:'],
                                        ['Email:'],
                                        ['Razon Social:']];

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
        this.clienteMarcado = this.clientes[0];
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
    this.clienteMarcado = item;
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
       
        this.clientes = data.data.map((valor: any) => new cliente(valor));
        this.ordenarPorId();
        this.clienteSeleccionado = this.clientes[0];
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
        this.clienteSeleccionado = this.clientes[0];
      },
      (error) => {
        alert(error.mensaje);
      }
    );
    this.mostrarModalBorrar = false
  }
 
  modificarPersonales() {
    let datosInput = {
      idcliente: this.clienteSeleccionado.idcliente,
      alias: this.clienteSeleccionado.alias,
      nombre: this.clienteSeleccionado.nombre,
      documento: this.clienteSeleccionado.documento,
      razon_social: this.clienteSeleccionado.razon_social
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
      poblacion:this.clienteSeleccionado.poblacion,
      notas: this.clienteSeleccionado.notas,
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
  guardarDatosInput(valores:Array<Array<any>>){
    this.clienteCrear.numero =  valores[0][0] ;
    this.clienteCrear.documento = valores[0][1];
    this.clienteCrear.nombre = valores[1][0];
    this.clienteCrear.alias = valores[2][0];
    this.clienteCrear.direccion = valores[3][0];
    this.clienteCrear.poblacion = valores[4][0];
    this.clienteCrear.provincia = valores[4][1];
    this.clienteCrear.codigo_postal = valores[4][2];
    this.clienteCrear.telefono = Number(valores[5][0]);
    this.clienteCrear.comercial = valores[5][1];
    this.clienteCrear.email = valores[6][0];
    this.clienteCrear.razon_social = valores[7][0];
  }

  guardarDatosNotas(valores:Array<string>){
    this.clienteCrear.notas = valores[0];
  }
  guardarDatosSwitch(valores:Array<boolean>){
    this.clienteCrear.activo = valores[0];
  }

  crearCliente(){
    this.clienteSvc.createCliente(this.clienteCrear).subscribe(
      (data) => {
        this.recargarDatos();
        this.mostrarModalCrear = false;
      },
      (error) =>{
        alert(error.error.message)
      }
    )
  }

  
}
