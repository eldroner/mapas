import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MapaMundoComponent } from '../../mapas-base/mapa-mundo/mapa-mundo.component';
import * as L from 'leaflet';

@Component({
  selector: 'app-antipodas',
  templateUrl: './antipodas.component.html',
  styleUrls: ['./antipodas.component.css'],
  standalone: true,  // Asegúrate de que esto esté presente
  imports: [MapaMundoComponent]  // Importa el componente hijo aquí
})
export class AntipodasComponent implements AfterViewInit {
  @ViewChild(MapaMundoComponent, { static: false }) mapaBase!: MapaMundoComponent;  // Referencia al componente padre (MapaMundoComponent)
  private marker!: L.Marker;
  private antipodeMarker!: L.Marker;

  ngAfterViewInit(): void {
    // Acceder al mapa base mediante la propiedad 'map' (pública en MapaMundoComponent)
    const map = this.mapaBase.map;

    // Evento de clic en el mapa para colocar el marcador
    map.on('click', (event: L.LeafletMouseEvent) => {
      const latLng = event.latlng;

      // Colocar marcador en el punto seleccionado
      if (this.marker) {
        this.marker.setLatLng(latLng);
      } else {
        this.marker = L.marker(latLng).addTo(map);
      }

      // Calcular las antípodas
      const antipodeLatLng = this.calculateAntipodes(latLng);

      // Colocar marcador en las antípodas
      if (this.antipodeMarker) {
        this.antipodeMarker.setLatLng(antipodeLatLng);
        this.antipodeMarker.bindPopup('Aquí están las antípodas').openPopup();
      } else {
        this.antipodeMarker = L.marker(antipodeLatLng, { icon: this.getAntipodeIcon() })
          .addTo(map)
          .bindPopup('Antípodas')
          .openPopup();
      }
    });
  }

  // Calcular las coordenadas de las antípodas
  private calculateAntipodes(latLng: L.LatLng): L.LatLng {
    const antipodeLat = -latLng.lat;
    const antipodeLng = latLng.lng > 0 ? latLng.lng - 180 : latLng.lng + 180;
    return L.latLng(antipodeLat, antipodeLng);
  }

  // Personalizar el ícono de las antípodas
  private getAntipodeIcon(): L.Icon {
    return L.icon({
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
  }
}
