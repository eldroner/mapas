import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interruptor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="interruptor">
      <label>
        <input type="checkbox" (change)="cambiarModo($event)" />
        <span>{{ modoActual }}</span>
      </label>
    </div>
  `,
  styles: [`
    .interruptor {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      margin: 10px;
    }
    input {
      margin-right: 10px;
    }
  `]
})
export class InterruptorComponent {
  @Output() modoCambiado: EventEmitter<string> = new EventEmitter<string>();
  modoActual: string = 'Modo Aprendizaje';

  cambiarModo(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.modoActual = checkbox.checked ? 'Modo Desafío' : 'Modo Aprendizaje';
    this.modoCambiado.emit(this.modoActual);
  }
}
