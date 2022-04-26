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
        this.clienteSeleccionado=this.clientes[0];
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }
}
