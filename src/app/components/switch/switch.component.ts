import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
  @Input() etiqueta: string = '';
  @Input() enableVal: string = 'Activo';
  @Input() disableVal: string = 'Inactivo';
  @Input() neutroVal: string = '-';
  // @Input() valores: string[] = ['No Activo', 'Activo', 'Estado'];
  @Input() numeroSwitch: number = 3;
  @Input() estilo: string = 'sm';
  @Output() changed = new EventEmitter<any>();
  @Input() valorInput: any = '';



  cambioInput(valor: string) {

    this.valorInput=valor;
    this.changed.emit(valor);
  }
}
