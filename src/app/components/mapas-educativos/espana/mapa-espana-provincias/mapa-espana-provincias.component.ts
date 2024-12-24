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
          style: this.styleProvinces.bind(this)
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

  // Estilo para dibujar solo las líneas de las provincias
  private styleProvinces(feature: any): L.PathOptions {
    return {
      color: '#FF0000', // Color del borde (rojo para mejor visibilidad)
      weight: 2, // Grosor del borde
      fillOpacity: 0, // Sin relleno para las provincias
    };
  }
}
