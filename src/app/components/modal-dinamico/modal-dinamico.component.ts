import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-dinamico',
  templateUrl: './modal-dinamico.component.html',
  styleUrls: ['./modal-dinamico.component.scss']
})
export class ModalDinamicoComponent implements OnInit{
  @Input() mensaje:any;
  @Input() titulo:string = '';
  @Input() colorBoton:string = '';
  @Input() palabraBoton:string = 'Confirmar';
  @Input() subTitulo:Array<Array<string>> = [[],[]];
  @Input() inputsText: Array<Array<string>> =  [[],[]];
  @Input() notas: Array<Array<string|number>> =  [[],[]];
  @Input() switch: Array<number> =  [];
  @Input() mostrarCuerpo: boolean = true;
  @Input() mensajeError: boolean = true;
  valorNotas:Array<string> =  [];
  valorSwitch:Array<boolean> =  [];
  valorInputsText:Array<Array<string>> =  [[],[]];

  @Output() enviarDatosInputText = new EventEmitter<any>();
  @Output() enviarDatosNotas = new EventEmitter<any>();
  @Output() enviarDatosSwitch = new EventEmitter<any>();
  @Output() cerrar = new EventEmitter<any>();
  @Output() confirmar = new EventEmitter<any>();


  ngOnInit(): void {
    for (let i = 0; i < this.inputsText.length ; i++) {
      let arrayString:Array<string> =[];
      for (let j = 0; j < this.inputsText[i].length; j++) {
        arrayString.push(''); 
      }
      this.valorInputsText.push(arrayString);
    }
    for (let i = 0; i < this.notas.length ; i++) {
      this.valorNotas.push('');
    }
    for (let i = 0; i < this.switch.length ; i++) {
      this.valorSwitch.push(false);
    }
  }

  reiniciarDatos(){
    console.log('hola')
    console.log(this.valorInputsText[0][1])
    for (let i = 0; i < this.valorInputsText.length ; i++) {
      for (let j = 0; j < this.valorInputsText[i].length; j++) {
        this.valorInputsText[i][j]=' ';
      }
    }
    for (let i = 0; i < this.valorNotas.length ; i++) {
      this.valorNotas[i]=''
    }
    for (let i = 0; i < this.valorSwitch.length ; i++) {
      this.valorSwitch[i]=false;
    }
    console.log(this.valorInputsText[0][1])

  }

  tituloMostar(numero:number):string{
    let cadena = '';
    this.subTitulo.map((valor: any) => cadena=(valor[1]==numero)? valor[0]:cadena);
    return cadena;
  }
  notasMostrar(numero:number):boolean{
    let validar:boolean = false;
    this.notas.map((valor: any) => {
      if(valor[1]==numero){ validar = true; }
    });
    return validar
  }
  notasString(numero:number):string{
    let cadena = '';
    this.notas.map((valor: any) => cadena=(valor[1]==numero)? valor[0]:cadena);
    return cadena;
  }
  switchMostrar(numero:number):boolean{
    let validar:boolean = false;
    this.switch.map((valor: any) => {
      if(valor==numero){ validar = true; }
    });
    return validar
  }
  switchString(numero:number):string{
    let cadena = '';
    this.notas.map((valor: any) => cadena=(valor[1]==numero)? valor[0]:cadena);
    return cadena;
  }

  botonEnviarDatos(){
    this.enviarDatosInputText.emit(this.valorInputsText);
    this.enviarDatosNotas.emit(this.valorNotas);
    this.enviarDatosSwitch.emit(this.valorSwitch);
    this.confirmar.emit();
    setTimeout(() => {
      if(!this.mensajeError){
        this.reiniciarDatos();
      }
     }, 1000);
  }
  
  clickedCerrar(){
    this.cerrar.emit();
  }

  cambiarNotas(numero:number,valor:string){
    for (let i = 0; i < this.notas.length; i++) {
      if(this.notas[i][1]==numero){
        this.valorNotas[i]= valor;
        break
      }
    }
  }
  cambiarSwitch(numero:number,valor:string){
    for (let i = 0; i < this.switch.length; i++) {
      if(this.switch[i]==numero){
        this.valorSwitch[i]= (valor=='1');
        break
      }
    }
  }

}
