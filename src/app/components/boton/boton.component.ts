import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.scss']
})
export class BotonComponent {
  @Input() estilo:string = '';
  @Input() etiqueta:string = '';
  @Output() enviarAccion = new EventEmitter();

  accionBoton(){
    this.enviarAccion.emit();
  }
}
