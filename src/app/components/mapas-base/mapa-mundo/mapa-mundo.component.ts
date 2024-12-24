import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa-mundo',
  templateUrl: './mapa-mundo.component.html',
  styleUrls: ['./mapa-mundo.component.css'],
  standalone: true
})
export class MapaMundoComponent implements OnInit {
  // Propiedades configurables que se pueden modificar desde el componente padre
  @Input() center: [number, number] = [0, 0]; // Coordenadas iniciales del centro
  @Input() zoom: number = 2; // Nivel de zoom inicial
  @Input() draggable: boolean = false; // Si el mapa es arrastrable o no
  @Input() scrollWheelZoom: boolean = true; // Si se puede hacer zoom con la rueda del ratón
  @Input() zoomControl: boolean = true; // Si el control de zoom está habilitado
  @Input() tileLayerUrl: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // URL de la capa de mapa

  public map!: L.Map;

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Crear el mapa
    this.map = L.map('map', {
      center: this.center,
      zoom: this.zoom,
      zoomControl: this.zoomControl,
      scrollWheelZoom: this.scrollWheelZoom
    });

    // Agregar la capa de mapa (tile layer)
    L.tileLayer(this.tileLayerUrl).addTo(this.map);

    // Configurar el arrastre según la propiedad `draggable`
    if (this.draggable) {
      this.map.dragging.enable();
    } else {
      this.map.dragging.disable();
    }
  }

  // Método para actualizar el mapa (por ejemplo, cuando cambian las propiedades)
  ngOnChanges(): void {
    if (this.map) {
      this.map.setView(this.center, this.zoom);
      if (this.draggable) {
        this.map.dragging.enable();
      } else {
        this.map.dragging.disable();
      }
    }
  }
}
