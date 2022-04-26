import { Component } from '@angular/core';
import { ClienteService } from './services/cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'practica-equipo';
  prueba:any = [1,2,3,4,5,6,7,8,9,10];
  clientes:any[]= [];
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
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }
}
