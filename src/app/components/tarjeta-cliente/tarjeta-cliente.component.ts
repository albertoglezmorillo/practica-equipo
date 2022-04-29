import { Component, Input} from '@angular/core';
import { cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'app-tarjeta-cliente',
  templateUrl: './tarjeta-cliente.component.html',
  styleUrls: ['./tarjeta-cliente.component.scss']
})
export class TarjetaClienteComponent {

  constructor() { }
  @Input() cliente:cliente = new cliente({})
  mostrar:boolean = true;

}
