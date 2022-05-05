import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.scss']
})
export class ModalConfirmacionComponent implements OnInit {

  @Output() emisor = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
eliminar(){
  this.emisor.emit();
}
}
