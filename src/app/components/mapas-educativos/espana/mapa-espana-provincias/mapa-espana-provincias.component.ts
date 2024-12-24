import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MapaEspanaComponent } from '../../../mapas-base/mapa-espana/mapa-espana.component';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa-provincias',
  templateUrl: './mapa-espana-provincias.component.html',
  styleUrls: ['./mapa-espana-provincias.component.css'],
  standalone: true, // Asegúrate de que el componente sea standalone
  imports: [MapaEspanaComponent], // Utiliza el mapa base
})
export class MapaEspanaProvinciasComponent implements AfterViewInit {
  @ViewChild(MapaEspanaComponent, { static: false }) mapaBase!: MapaEspanaComponent;
  private geoJsonLayer!: L.GeoJSON;

  ngAfterViewInit(): void {
    const map = this.mapaBase.map;

    // Establecer los límites del mapa para que incluya toda España (península y las islas)
    const bounds = L.latLngBounds(
      L.latLng(27.251278, -18.893679),  // Coordenadas suroeste de las Islas Canarias
      L.latLng(43.574867, 5.654801)          // Coordenadas noreste de la península
    );
    map.setMaxBounds(bounds); // Prevenir que el mapa se mueva fuera de estos límites
    map.fitBounds(bounds);    // Ajusta el mapa a estos límites

    this.loadProvincesGeoJSON(map);
  }

  // Cargar y mostrar las provincias desde un archivo GeoJSON
  private loadProvincesGeoJSON(map: L.Map): void {
    fetch('assets/spain-provinces.geojson')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar el archivo GeoJSON');
        }
        return response.json();
      })
      .then((geojson) => {
        console.log("GeoJSON cargado:", geojson);

        this.geoJsonLayer = L.geoJSON(geojson, {
          style: this.styleProvinces.bind(this),
          onEachFeature: this.onEachFeature.bind(this) // Agregar eventos de interacción
        });

        if (this.geoJsonLayer) {
          this.geoJsonLayer.addTo(map);
          console.log('Capa GeoJSON agregada al mapa');

          // Verificar si la capa está correctamente añadida
          if (map.hasLayer(this.geoJsonLayer)) {
            console.log('La capa GeoJSON está añadida al mapa');
          } else {
            console.log('La capa GeoJSON no se ha añadido correctamente');
          }
        }
      })
      .catch((error) => console.error('Error cargando el archivo GeoJSON:', error));
  }

  // Estilo para colorear las provincias
  private styleProvinces(feature: any): L.PathOptions {
    return {
      color: '#D4DADC', // Color del borde (negro)
      weight: 0.1, // Grosor del borde
      fillColor: this.getRandomColor(), // Color de relleno aleatorio
      fillOpacity: 0.7, // Relleno con opacidad del 70%
    };
  }

  // Método para generar un color aleatorio
  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Añadir interactividad a cada provincia
  private onEachFeature(feature: any, layer: L.Layer): void {
    layer.on({
      mouseover: (e: L.LeafletMouseEvent) => this.highlightFeature(e),
      mouseout: (e: L.LeafletMouseEvent) => this.resetHighlight(e),
    });
  }

  // Resaltar la provincia al pasar el mouse
  private highlightFeature(e: L.LeafletMouseEvent): void {
    const layer = e.target;

    // Cambiar temporalmente el estilo
    layer.setStyle({
      fillOpacity: 1, // Opacidad más fuerte
      fillColor: '#FFD700', // Color dorado para destacar
    });

    // Asegurarse de que el cambio visual se aplique correctamente
    layer.bringToFront();
  }

  // Restaurar el estilo original al quitar el mouse
  private resetHighlight(e: L.LeafletMouseEvent): void {
    const layer = e.target;

    // Restaurar el estilo original (vuelve al estilo de las provincias)
    this.geoJsonLayer.resetStyle(layer);
  }
}
