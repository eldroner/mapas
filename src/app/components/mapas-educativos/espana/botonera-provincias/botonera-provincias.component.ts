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
        [isActive]="provincia === provinciaActiva"
        [isDisabled]="botonesDeshabilitados.has(provincia)"
        (onClick)="seleccionarProvincia(provincia)">
      </app-boton>
    </div>
  `,
  styles: [`
    .botonera {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
    }
  `],
  standalone: true, // Asegúrate de que esté configurado como standalone
  imports: [CommonModule, BotonComponent] // Importa los módulos necesarios
})
export class BotoneraProvinciasComponent {
  @Input() provincias: string[] = [];
  @Input() provinciaActiva: string | null = null;
  @Output() respuestaSeleccionada: EventEmitter<string> = new EventEmitter<string>();

  botonesDeshabilitados: Set<string> = new Set<string>();

  reiniciarBotones(): void {
    this.botonesDeshabilitados.clear();
  }

  seleccionarProvincia(provincia: string): void {
    if (!this.botonesDeshabilitados.has(provincia)) {
      this.respuestaSeleccionada.emit(provincia);
    }
  }

  marcarComoCorrecta(provincia: string): void {
    this.botonesDeshabilitados.add(provincia); // Marcar el botón como deshabilitado
  }
  
}
