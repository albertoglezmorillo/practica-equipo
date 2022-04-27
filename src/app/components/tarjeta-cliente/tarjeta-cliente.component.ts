import { Component, Input, OnInit } from '@angular/core';
import { cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'app-tarjeta-cliente',
  templateUrl: './tarjeta-cliente.component.html',
  styleUrls: ['./tarjeta-cliente.component.scss']
})
export class TarjetaClienteComponent implements OnInit {

  constructor() { }
  @Input() cliente:cliente = new cliente({})
  ngOnInit(): void {
  }

}
