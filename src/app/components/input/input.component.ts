import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent  {
  @Input() estilo:string = '';
  @Input() etiqueta:string = '';
  @Input() valorInput:any = '';
  @Input() botonBorrar:boolean = false;
  @Input() maximoCaracteres:number = 100;
}
