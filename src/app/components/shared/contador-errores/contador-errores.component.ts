import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contador-errores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contador-errores.component.html',
  styleUrls: ['./contador-errores.component.css'], // Archivo CSS correcto
})
export class ContadorErroresComponent {
  @Input() errores: number = 0;
  @Output() fallosMaximos: EventEmitter<void> = new EventEmitter<void>();

  incrementarErrores(): void {
    this.errores++;
  }

  getEstadoErrores(): string {
    if (this.errores === 0) {
      return '¡Vas muy bien!';
    } else if (this.errores === 1) {
      return '¡Ten cuidado...!';
    } else if (this.errores === 2) {
      return '¡Mucho cuidado!';
    } else {
      return 'Has perdido. Se acabó el juego.';
    }
  }

  ngOnChanges(): void {
    if (this.errores >= 3) {
      this.fallosMaximos.emit(); // Notificar al padre que se alcanzaron los fallos máximos
    }
  }

  
}
