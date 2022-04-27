import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta-cliente',
  templateUrl: './tarjeta-cliente.component.html',
  styleUrls: ['./tarjeta-cliente.component.scss']
})
export class TarjetaClienteComponent implements OnInit {

  constructor() { }
  @Input() cliente:any = {}
  ngOnInit(): void {
  }

}
