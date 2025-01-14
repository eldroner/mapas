import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BotonComponent } from '../../../shared/boton/boton.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-botonera-provincias',
  template: `
    <div class="botonera">
      <app-boton
        *ngFor="let provincia of provincias"
        [texto]="provincia"
        [isActive]="botonesCorrectos.has(provincia)" 
        [isDisabled]="botonesDeshabilitados.has(provincia)" 
        (onClick)="seleccionarProvincia(provincia)">
      </app-boton>
    </div>
  `,
  styles: [
    `
      .botonera {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, BotonComponent],
})
export class BotoneraProvinciasComponent {
  @Input() provincias: string[] = []; // Lista de provincias
  @Input() provinciaActiva: string | null = null; // Provincia activa actual
  @Input() modoJuego: boolean = false; // Controla si estamos en modo juego
  @Output() respuestaSeleccionada: EventEmitter<string> = new EventEmitter<string>();

  botonesCorrectos: Set<string> = new Set<string>(); // Provincias acertadas
  botonesDeshabilitados: Set<string> = new Set<string>(); // Provincias deshabilitadas

  // Reinicia el estado de los botones
  reiniciarBotones(): void {
    this.botonesCorrectos.clear();
    this.botonesDeshabilitados.clear();
  }

  // Maneja la selección de una provincia
  seleccionarProvincia(provincia: string): void {
    if (!this.botonesDeshabilitados.has(provincia)) {
      this.respuestaSeleccionada.emit(provincia); // Emite el evento al componente padre
    }
  }

  // Marca un botón como correcto y lo deshabilita
  marcarComoCorrecta(provincia: string): void {

    this.botonesCorrectos.add(provincia); // Añadir a la lista de botones correctos
    this.botonesDeshabilitados.add(provincia); // Añadir a la lista de deshabilitados

    console.log('Marcando provincia como correcta en botonera:', provincia);
    console.log('Botones correctos actuales:', Array.from(this.botonesCorrectos));
  }
  
}
