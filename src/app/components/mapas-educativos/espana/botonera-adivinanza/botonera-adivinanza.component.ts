import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-botonera-adivinanza',
  template: `
    <div class="botonera">
      <button *ngFor="let provincia of provincias" (click)="adivinarProvincia(provincia)">
        {{ provincia }}
      </button>
    </div>
  `,
  styleUrls: ['./botonera-adivinanza.component.css'],
})
export class BotoneraAdivinanzaComponent {
  @Input() provincias: string[] = [];
  @Output() provinciaAdivinada = new EventEmitter<string>();

  adivinarProvincia(provincia: string): void {
    this.provinciaAdivinada.emit(provincia);
  }
}
