import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';  // Asegúrate de importar Leaflet

@Component({
  selector: 'app-meridiano-movil',
  templateUrl: './meridiano-movil.component.html',
  styleUrls: ['./meridiano-movil.component.css']
})
export class MeridianoMovilComponent implements AfterViewInit {
  @ViewChild('map', { static: false }) mapElement!: ElementRef;  // Usamos el operador '!' para asegurar que mapElement será inicializado

  map: any;  // Variable para almacenar la instancia del mapa

  constructor() { }

  // Usamos ngAfterViewInit en lugar de ngOnInit
  ngAfterViewInit(): void {
    this.initializeMap();  // Inicializar el mapa cuando la vista esté lista
  }

  // Función para inicializar el mapa
  initializeMap(): void {
    if (this.mapElement) {
      // Crear el mapa en el contenedor de la vista
      this.map = L.map(this.mapElement.nativeElement, {
        center: [0, 0],  // Centrar el mapa en el punto (0, 0), es decir, el centro del mundo
        zoom: 1.7,  // Ajustar el nivel de zoom para ver todo el mundo
        minZoom: 1,  // Nivel de zoom mínimo para evitar el zoom excesivo hacia adentro
        maxZoom: 10,  // Nivel de zoom máximo para evitar el zoom excesivo hacia afuera
        worldCopyJump: true,  // Permite un "wrap-around" en el mapa (horizontales)
        scrollWheelZoom: false,  // Desactiva el zoom con la rueda del ratón
        maxBounds: [
          [-850, -1800],  // Limitar la latitud (no se puede mover más allá de -85 y 85)
          [850, 1800]     // Limitar la latitud (no se puede mover más allá de -85 y 85)
        ],  // Limitar el movimiento del mapa a los bordes del mundo
      });

      // Añadir capa de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

    }
  }
}
