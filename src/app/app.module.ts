import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TarjetaClienteComponent } from './componentes/tarjeta-cliente/tarjeta-cliente/tarjeta-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    TarjetaClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
