import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MapaMundoComponent } from '../../mapas-base/mapa-mundo/mapa-mundo.component';
import * as L from 'leaflet';

@Component({
  selector: 'app-meridiano-movil',
  templateUrl: './meridiano-movil.component.html',
  styleUrls: ['./meridiano-movil.component.css'],
  standalone: true,
  imports: [MapaMundoComponent],
})
export class MeridianoMovilComponent implements AfterViewInit {
  @ViewChild(MapaMundoComponent, { static: false }) mapaBase!: MapaMundoComponent;

  ngAfterViewInit(): void {
    const map = this.mapaBase.map;

    // Establecer los límites verticales del mapa
    const maxBounds = L.latLngBounds(
      L.latLng(-90, -Infinity), // Limitar latitudes mínimas (abajo)
      L.latLng(90, Infinity) // Limitar latitudes máximas (arriba)
    );
    map.setMaxBounds(maxBounds);

    // Asegurarnos de que el mapa permita el movimiento horizontal infinito
    map.on('move', () => {
      const bounds = map.getBounds();
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();

      // Restringir solo el movimiento vertical
      if (northEast.lat > 90 || southWest.lat < -90) {
        map.panTo([Math.min(Math.max(map.getCenter().lat, -90), 90), map.getCenter().lng], {
          animate: false,
        });
      }
    });


  }
}
