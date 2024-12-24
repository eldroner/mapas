import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-boton',
  template: `
    <button
      (click)="handleClick()"
      [disabled]="isDisabled"
      [class.active]="isActive"
      [class.success]="isDisabled"
      class="boton">
      {{ texto }}
    </button>
  `,
  styles: [`
    .boton {
      padding: 10px 20px;
      margin: 5px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 5px;
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      transition: background-color 0.3s, color 0.3s;
    }
    .boton.active {
      background-color: #007bff;
      color: #fff;
      border-color: #0056b3;
    }
    .boton.success {
      background-color: #28a745; /* Verde cuando es correcto */
      color: #fff;
      border-color: #1e7e34;
      cursor: not-allowed; /* Mostrar que el botón está deshabilitado */
    }
    .boton:hover {
      background-color: #0056b3;
      color: #fff;
    }
    .boton:disabled {
      cursor: not-allowed; /* Cursor para botones deshabilitados */
      opacity: 0.65; /* Reducir opacidad de botones deshabilitados */
    }
  `],
  standalone: true
})
export class BotonComponent {
  @Input() texto: string = ''; // Texto del botón
  @Input() isActive: boolean = false; // Si el botón está activo o no
  @Input() isDisabled: boolean = false; // Si el botón está deshabilitado
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  handleClick(): void {
    if (!this.isDisabled) {
      this.onClick.emit(); // Emitir evento cuando el botón es pulsado
    }
  }
}
