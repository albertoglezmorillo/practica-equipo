import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent {

  @Input() etiqueta:string = '';
  @Input() valorInput:any = '';
  @Input() maximoCaracteres:number = 100;


}
