import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent{
  @Input() valores:string[] = ['No Activo','Activo',''];
  @Input() numeroSwitch:number = 3;
  @Input() estilo:string = 'sm';
  @Output() changed = new EventEmitter<any>();
  valor:string = this.valores[1];

  cambioInput(valor:string){
    this.changed.emit(valor);
  }
}
