import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa-espana',
  templateUrl: './mapa-espana.component.html',
  styleUrls: ['./mapa-espana.component.css'],
  standalone: true,
})
export class MapaEspanaComponent implements OnInit {
  @Input() center: [number, number] = [40.4168, -3.7038];  // Coordenadas centradas en Madrid
  @Input() zoom: number = 6;  // Nivel de zoom
  @Input() draggable: boolean = false;  // Si el mapa es arrastrable
  @Input() disableZoom: boolean = false; // Nueva propiedad para desactivar el zoom

  public map!: L.Map;
  private layersControl: L.Control.Layers | undefined;

  ngOnInit(): void {
    this.initializeMap();
    this.addBaseLayers();
    this.addControls();
  }

  // Inicializar el mapa
  private initializeMap(): void {
    this.map = L.map('map', {
      center: this.center, // Utiliza el valor de 'center' proporcionado desde el HTML
      zoom: this.zoom,     // Utiliza el valor de 'zoom' proporcionado desde el HTML
      zoomControl: !this.disableZoom,  // Si se debe desactivar el control de zoom
      dragging: this.draggable, // Si el mapa puede ser arrastrado
      scrollWheelZoom: !this.disableZoom,  // Desactivar el zoom con la rueda del ratón
      touchZoom: !this.disableZoom,        // Desactivar el zoom táctil
      doubleClickZoom: !this.disableZoom,  // Desactivar el zoom con doble clic
    });
  }

  // Añadir capas base seleccionables
  private addBaseLayers(): void {
    // Capa de mapa mudo (CartoDB Positron No Labels)
    const muteMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    });

    // Agregar la capa mudo por defecto
    muteMap.addTo(this.map);
  }

  // Añadir controles al mapa
  private addControls(): void {
    // Control de escala
    L.control.scale({ imperial: false, metric: true }).addTo(this.map);

    // Control de zoom personalizado
    L.control.zoom({ position: 'topright' }).addTo(this.map);
  }

  // Métodos públicos para futuras interacciones

  // Añadir un marcador
  public addMarker(lat: number, lng: number, popupText?: string): L.Marker {
    const marker = L.marker([lat, lng]).addTo(this.map);
    if (popupText) {
      marker.bindPopup(popupText).openPopup();
    }
    return marker;
  }

  // Añadir un polígono
  public addPolygon(latlngs: L.LatLngExpression[], color: string = 'blue'): L.Polygon {
    const polygon = L.polygon(latlngs, { color }).addTo(this.map);
    return polygon;
  }

  // Añadir eventos al mapa
  public onMapClick(callback: (e: L.LeafletMouseEvent) => void): void {
    this.map.on('click', callback);
  }

  // Añadir capas personalizadas al control
  public addCustomLayer(name: string, layer: L.Layer): void {
    if (this.layersControl) {
      this.layersControl.addOverlay(layer, name);
    }
    layer.addTo(this.map);
  }
}
