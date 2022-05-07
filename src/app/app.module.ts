import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TarjetaClienteComponent } from './components/tarjeta-cliente/tarjeta-cliente.component';
import { BotonComponent } from './components/boton/boton.component';
import { InputComponent } from './components/input/input.component';
import { HttpClientModule } from "@angular/common/http";
import { ClienteService } from './services/cliente.service';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { SwitchComponent } from './components/switch/switch.component';
import { ModalDinamicoComponent } from './components/modal-dinamico/modal-dinamico.component';


@NgModule({
  declarations: [
    AppComponent,
    TarjetaClienteComponent,
    BotonComponent,
    InputComponent,
    TextAreaComponent,
    SwitchComponent,
    ModalDinamicoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
    
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
