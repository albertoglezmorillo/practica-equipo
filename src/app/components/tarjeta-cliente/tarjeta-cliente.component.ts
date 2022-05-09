import { Component, EventEmitter, Input, Output} from '@angular/core';
import { cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-tarjeta-cliente',
  templateUrl: './tarjeta-cliente.component.html',
  styleUrls: ['./tarjeta-cliente.component.scss']
})
export class TarjetaClienteComponent {

  @Input() cliente:cliente = new cliente({})
  @Output() tarjetaSelec=new EventEmitter()
  mostrar:boolean = true;
  

  validarClick(){
    this.tarjetaSelec.emit();
  }
}
