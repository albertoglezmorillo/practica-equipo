import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.scss']
})
export class BotonComponent {
  @Input() estilo:string = '';
  @Input() etiqueta:string = '';
  @Input() size:string = '';
  @Output() enviarAccion = new EventEmitter();

  accionBoton(){
    this.enviarAccion.emit();
  }
  cambiarEstilo():string{
    switch (this.estilo) {
      case 'warning-sm':
        return  'btn-sm btn-warning';
        break;
      case 'warning':
        return  'btn-warning';
        break;
      case 'success-sm':
        return 'btn-sm btn-success';
        break;
      case 'success':
        return 'btn-success';
        break;
      case 'dark-sm':
        return 'btn-sm btn-dark';
        break;
      case 'dark':
        return 'btn-dark';
        break;
      case 'danger-sm':
        return 'btn-sm btn-danger';
        break;
      case 'danger':
        return 'btn-danger';
        break;
      case 'sm':
        return 'btn-sm';
        break;
    }
    return 'btn-primary'
  }
}
