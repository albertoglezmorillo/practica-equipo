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
    // this.reiniciarValores();
    console.log("cliente seleccionado",this.clienteSeleccionado);

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
}
