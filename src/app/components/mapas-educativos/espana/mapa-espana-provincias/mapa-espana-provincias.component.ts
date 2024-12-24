import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MapaEspanaComponent } from '../../../mapas-base/mapa-espana/mapa-espana.component';
import { BotoneraProvinciasComponent } from '../botonera-provincias/botonera-provincias.component';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa-espana-provincias',
  templateUrl: './mapa-espana-provincias.component.html',
  styleUrls: ['./mapa-espana-provincias.component.css'],
  standalone: true,
  imports: [MapaEspanaComponent, BotoneraProvinciasComponent]
})
export class MapaEspanaProvinciasComponent implements AfterViewInit {
  @ViewChild(MapaEspanaComponent, { static: false }) mapaBase!: MapaEspanaComponent;
  @ViewChild(BotoneraProvinciasComponent, { static: false }) botonera!: BotoneraProvinciasComponent;

  provincias: string[] = [
    "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila",
    "Badajoz", "Barcelona", "Burgos", "Cáceres", "Cádiz", "Cantabria",
    "Castellón", "Ciudad Real", "Córdoba", "Cuenca", "Girona", "Granada",
    "Guadalajara", "Guipúzcoa", "Huelva", "Huesca", "Illes Balears", "Jaén",
    "La Coruña", "La Rioja", "Las Palmas", "León", "Lérida", "Lugo",
    "Madrid", "Málaga", "Murcia", "Navarra", "Ourense", "Palencia",
    "Pontevedra", "Salamanca", "Santa Cruz de Tenerife", "Segovia",
    "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia",
    "Valladolid", "Vizcaya", "Zamora", "Zaragoza"
  ];

  provinciaActiva: string | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const map = this.mapaBase.map;

    // Inicializar límites del mapa
    const bounds = L.latLngBounds(
      L.latLng(27.251278, -18.893679), // Suroeste de las Islas Canarias
      L.latLng(43.574867, 5.654801)   // Noreste de la península
    );
    map.setMaxBounds(bounds);
    map.fitBounds(bounds);

    this.loadProvincesGeoJSON(map);
    this.provinciaActiva = this.seleccionarProvinciaAleatoria();
    this.cdr.detectChanges(); // Aseguramos que Angular detecte los cambios
  }

  manejarRespuesta(provincia: string): void {
    if (provincia === this.provinciaActiva) {
      alert(`¡Correcto! Has seleccionado ${provincia}`);
      this.botonera.marcarComoCorrecta(provincia); // Deshabilitar el botón correcto
      this.provinciaActiva = this.seleccionarProvinciaAleatoria();
    } else {
      alert(`Incorrecto. La provincia activa era ${this.provinciaActiva}`);
    }
  }

  private seleccionarProvinciaAleatoria(): string {
    const randomIndex = Math.floor(Math.random() * this.provincias.length);
    return this.provincias[randomIndex];
  }

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

        L.geoJSON(geojson, {
          style: this.styleProvinces.bind(this),
          onEachFeature: this.onEachFeature.bind(this)
        }).addTo(map);
      })
      .catch((error) => console.error('Error cargando el archivo GeoJSON:', error));
  }

  private styleProvinces(feature: any): L.PathOptions {
    // Generar un color aleatorio para cada provincia
    const color = this.getRandomColor();
    feature.properties.originalColor = color;

    return {
      color: '#000', // Sin borde
      weight: 0, // Grosor del borde
      fillColor: color, // Color único
      fillOpacity: 0.7,
    };
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private onEachFeature(feature: any, layer: L.Layer): void {
    layer.on({
      mouseover: (e: L.LeafletMouseEvent) => this.highlightFeature(e),
      mouseout: (e: L.LeafletMouseEvent) => this.resetHighlight(e),
    });
  }

  private highlightFeature(e: L.LeafletMouseEvent): void {
    const layer = e.target;

    layer.setStyle({
      fillOpacity: 1,
      fillColor: '#FFD700', // Color resaltado
    });

    layer.bringToFront();
  }

  private resetHighlight(e: L.LeafletMouseEvent): void {
    const layer = e.target;
    const originalColor = layer.feature?.properties?.originalColor || '#CCCCCC';

    layer.setStyle({
      fillOpacity: 0.7,
      fillColor: originalColor, // Restaurar color original
    });
  }
}
