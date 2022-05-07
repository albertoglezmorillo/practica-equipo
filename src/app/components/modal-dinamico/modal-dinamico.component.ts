import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-dinamico',
  templateUrl: './modal-dinamico.component.html',
  styleUrls: ['./modal-dinamico.component.scss']
})
export class ModalDinamicoComponent {
  @Input() mensaje:any;
  @Input() titulo:string = '';
  @Input() subTitulo:Array<Array<string>> = [[],[]];
  @Input() inputsText: Array<Array<string>> =  [[],[]];
  @Input() palabraBoton:string = 'Confirmar';
  @Input() mostrarCuerpo: boolean = true;
  valorInputsText:Array<Array<string>> =  [];

  @Output() enviarDatos = new EventEmitter<any>();
  @Output() cerrar = new EventEmitter<any>();

  constructor(){
    for (let i = 0; i < this.inputsText.length ; i++) {
      let arrayString:Array<string> =[];
      for (let j = 0; j < this.inputsText[i].length ; j++) {
        arrayString.push(''); 
      }
      this.valorInputsText.push(arrayString);
    }
  }

  tituloMostar(numero:number):string{
    let cadena = '';
    this.subTitulo.map((valor: any) => cadena=(valor[1]==numero)? valor[0]:cadena);
    return cadena;
  }

  botonEnviarDatos(){
    this.enviarDatos.emit(this.valorInputsText);
  }
  
  clickedCerrar(){
    this.cerrar.emit();
  }

}
