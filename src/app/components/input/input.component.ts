import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent  {
  @Input() estilo:string = '';
  @Input() etiqueta:string = '';
  @Input() valorInput:any;
  @Input() botonBorrar:boolean = false;
  @Input() maximoCaracteres:number = 100;
  @Input() size:string = '';
  @Input() soloLectura:boolean = false;
  @Output() changed = new EventEmitter<any>();


  cambioInput(){
    this.changed.emit(this.valorInput);
  }
  borrarInput(){
    this.valorInput = '';
    this.changed.emit(this.valorInput);
  }
}
