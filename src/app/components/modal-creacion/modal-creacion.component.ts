import { Component, EventEmitter, Output } from '@angular/core';
import { cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-modal-creacion',
  templateUrl: './modal-creacion.component.html',
  styleUrls: ['./modal-creacion.component.scss']
})
export class ModalCreacionComponent {

  @Output() salida = new EventEmitter();
  constructor(public clienteSrv:ClienteService) { }
  
  input_modal:cliente = new cliente({});

  set_model(valor:any,tipo:string){

    switch (tipo){
      case "numero":
        this.input_modal.numero = valor;
        break
      case "documento":
        this.input_modal.documento = valor;
        break
      case "nombre":
        this.input_modal.nombre = valor;
        break
      case "alias":
        this.input_modal.alias = valor;
        break
      case "direccion":
        this.input_modal.direccion = valor;
        break
      case "poblacion":
        this.input_modal.poblacion = valor;
        break
      case "provincia":
        this.input_modal.provincia = valor;
        break
      case "codigo_postal":
        this.input_modal.codigo_postal = valor;
        break
      case "telefono":
        this.input_modal.telefono = valor;
        break
      case "comercial":
        this.input_modal.comercial = valor;
        break
      case "email":
        this.input_modal.email = valor;
        break
      case "razon_social":
        this.input_modal.razon_social = valor;
        break
      case "notas":
        this.input_modal.notas = valor;
        break
      case "activo":
        this.input_modal.activo = (valor);
        break
    }

    
  }
  crear(){
    this.clienteSrv.createCliente(this.input_modal).subscribe(
      (data) => {this.salida.emit()}
    )
  }

}
