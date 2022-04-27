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
      case '1':
        return 'btn-warning';
        break;
      case '2':
        return 'btn-success';
        break;
      case '3':
        return 'btn-dark';
        break;
    }
    return 'btn-primary'
  }
}
