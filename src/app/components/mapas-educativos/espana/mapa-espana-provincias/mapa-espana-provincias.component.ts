import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MapaEspanaComponent } from '../../../mapas-base/mapa-espana/mapa-espana.component';
import { BotoneraProvinciasComponent } from '../botonera-provincias/botonera-provincias.component';
import { ContadorErroresComponent } from '../../../shared/contador-errores/contador-errores.component';
import * as L from 'leaflet';
import { AlertService } from '../../../../shared/alert.service';


interface PathWithFeature extends L.Path {
  feature?: GeoJSON.Feature & { properties: { [key: string]: any } };
}

@Component({
  selector: 'app-mapa-espana-provincias',
  templateUrl: './mapa-espana-provincias.component.html',
  styleUrls: ['./mapa-espana-provincias.component.css'],
  standalone: true,
  imports: [MapaEspanaComponent, BotoneraProvinciasComponent, ContadorErroresComponent]
})
export class MapaEspanaProvinciasComponent implements AfterViewInit {
  @ViewChild(MapaEspanaComponent, { static: false }) mapaBase!: MapaEspanaComponent;
  @ViewChild('botoneraIzquierda', { static: false }) botoneraIzquierda!: BotoneraProvinciasComponent;
  @ViewChild('botoneraDerecha', { static: false }) botoneraDerecha!: BotoneraProvinciasComponent;
  

  provincias: string[] = []; // Extraídas dinámicamente desde el GeoJSON
  provinciasIzquierda: string[] = [];
  provinciasDerecha: string[] = [];
  provinciasUsadas: Set<string> = new Set(); // Provincias ya seleccionadas
  provinciaActiva: string | null = null;
  modoJuego: boolean = false; // True para activar el modo juego
  provinciaActual: string | null = null; // Provincia que el usuario debe adivinar
  puntaje: number = 0;
  progreso: number = 0;
  errores: number = 0; // Contador de errores
  maxErrores: number = 3; // Máximo número de errores permitidos
  totalProvincias: number = this.provincias.length; // Total de provincias
  private geoJsonLayer!: L.GeoJSON;
  private capaProvinciaActiva: PathWithFeature | null = null;
  private parpadeoInterval: any = null;
  private marcadorProvinciaPequena: L.CircleMarker | null = null; // Para Ceuta y Melilla


  constructor(private cdr: ChangeDetectorRef, private alertService: AlertService) {}

  ngAfterViewInit(): void {
    console.log('Botonera izquierda inicializada:', this.botoneraIzquierda);
    console.log('Botonera derecha inicializada:', this.botoneraDerecha);
  
    const map = this.mapaBase.map;
  
    const bounds = L.latLngBounds(
      L.latLng(27.251278, -18.893679), // Suroeste de las Islas Canarias
      L.latLng(43.574867, 5.654801)   // Noreste de la península
    );
    map.setMaxBounds(bounds);
    map.fitBounds(bounds);
  
    this.loadProvincesGeoJSON(map).then(() => {
      this.dividirProvincias();
      this.provinciaActiva = this.seleccionarProvinciaAleatoria();
      this.cdr.detectChanges();
    });
  }
  
  

  manejarFallosMaximos(): void {
    alert('¡Has alcanzado el límite de errores!');
    this.reiniciarErrores();
  } 

  reiniciarErrores(): void {
    this.errores = 0;
  }

  verificarSeleccion(provincia: string): void {
    if (provincia !== this.provinciaActiva) {
      this.errores++; // Incrementa los errores si la selección es incorrecta
    }
  }

  manejarRespuesta(provincia: string): void {
    if (provincia === this.provinciaActiva) {
      this.alertService.mostrarExito('¡Muy bien, has acertado!');
  
      // Marcar como correcta en ambas botoneras
      this.botoneraIzquierda.marcarComoCorrecta(provincia);
      this.botoneraDerecha.marcarComoCorrecta(provincia);
  
      this.detenerIluminacionProvincia();
      this.provinciasUsadas.add(provincia);
      this.provinciaActiva = this.seleccionarProvinciaAleatoria();
    } else {
      this.alertService.mostrarError(`Has fallado. La provincia correcta era ${this.provinciaActiva}.`);
      this.errores++;
      if (this.errores >= this.maxErrores) {
        this.mostrarDialogoFinJuego(true);
      }
    }
  }
  
  
  

  private dividirProvincias(): void {
    const mitad = Math.ceil(this.provincias.length / 2);
    this.provinciasIzquierda = this.provincias.slice(0, mitad);
    this.provinciasDerecha = this.provincias.slice(mitad);
  }

  private seleccionarProvinciaAleatoria(): string | null {
    const provinciasRestantes = this.provincias.filter(p => !this.provinciasUsadas.has(p));

    if (provinciasRestantes.length === 0) {
      this.mostrarDialogoFinJuego(); // Mostrar ventana emergente
      return null;
    }

    const randomIndex = Math.floor(Math.random() * provinciasRestantes.length);
    const nuevaProvincia = provinciasRestantes[randomIndex];

    // Activar visualmente la provincia
    this.activarProvinciaEnMapa(nuevaProvincia);

    return nuevaProvincia;
  }

  private async loadProvincesGeoJSON(map: L.Map): Promise<void> {
    const response = await fetch('assets/spain-provinces.geojson');
    if (!response.ok) {
      throw new Error('Error al cargar el archivo GeoJSON');
    }
    const geojson = await response.json();

    // Extraer los nombres de las provincias directamente del GeoJSON
    this.provincias = geojson.features.map((feature: any) => feature.properties.name);

    this.geoJsonLayer = L.geoJSON(geojson, {
      style: this.styleProvinces.bind(this),
      onEachFeature: this.onEachFeature.bind(this)
    }).addTo(map);
  }

  private styleProvinces(feature: any): L.PathOptions {
    const color = this.getRandomColor();
    feature.properties['originalColor'] = color;

    return {
      color: '#000', // Borde negro
      weight: 0,
      fillColor: color,
      fillOpacity: 0.7,
    };
  }

  private activarProvinciaEnMapa(nombreProvincia: string): void {
    if (this.geoJsonLayer) {
      this.geoJsonLayer.eachLayer((layer: L.Layer) => {
        const pathLayer = layer as PathWithFeature;
        if (pathLayer.feature?.properties?.['name'] === nombreProvincia) {
          this.capaProvinciaActiva = pathLayer;
  
          // Inicia el parpadeo para provincias normales
          if (nombreProvincia !== 'Ceuta' && nombreProvincia !== 'Melilla') {
            this.iniciarParpadeoProvincia(pathLayer);
          } else {
            this.iniciarParpadeoProvinciaPequena(nombreProvincia);
          }
        }
      });
    }
  }

  private iniciarParpadeoProvinciaPequena(nombreProvincia: string): void {
    const coordenadas: { [key: string]: [number, number] } = {
      'Ceuta': [35.889387, -5.321345],
      'Melilla': [35.292277, -2.938097]
    };
  
    const posicion = coordenadas[nombreProvincia];
    if (!posicion) return;
  
    // Elimina cualquier marcador existente
    if (this.marcadorProvinciaPequena) {
      this.mapaBase.map.removeLayer(this.marcadorProvinciaPequena);
    }
  
    // Crea un nuevo marcador circular
    this.marcadorProvinciaPequena = L.circleMarker(posicion, {
      radius: 10, // Tamaño del marcador
      color: '#FFD700', // Borde dorado
      fillColor: '#FFD700', // Relleno dorado
      fillOpacity: 1
    }).addTo(this.mapaBase.map);
  
    // Parpadeo
    let visible = true;
    this.parpadeoInterval = setInterval(() => {
      if (this.marcadorProvinciaPequena) {
        this.marcadorProvinciaPequena.setStyle({
          fillOpacity: visible ? 1 : 0.3,
          radius: visible ? 15 : 10, // Alterna entre dos tamaños
        });
        visible = !visible;
      }
    }, 500);
  }
  
  

  private detenerIluminacionProvincia(): void {
    if (this.capaProvinciaActiva) {
      clearInterval(this.parpadeoInterval); // Detener el parpadeo
      const originalColor = this.capaProvinciaActiva.feature?.properties?.['originalColor'] || '#CCCCCC';
      this.capaProvinciaActiva.setStyle({
        fillColor: originalColor,
        fillOpacity: 0.7
      });
      this.capaProvinciaActiva = null;
    }
  
    // Eliminar marcador de provincia pequeña
    if (this.marcadorProvinciaPequena) {
      this.mapaBase.map.removeLayer(this.marcadorProvinciaPequena);
      this.marcadorProvinciaPequena = null;
    }
  }
  

  private iniciarParpadeoProvincia(layer: PathWithFeature): void {
    let visible = true; // Control de visibilidad
    const originalColor = layer.feature?.properties?.['originalColor'] || '#000';

    this.parpadeoInterval = setInterval(() => {
      layer.setStyle({
        fillColor: visible ? '#FFD700' : originalColor,
        fillOpacity: visible ? 1 : 0.7,
      });
      visible = !visible; // Cambiar el estado
    }, 500); // Cambia cada 500ms
  }

    private mostrarDialogoFinJuego(porErrores: boolean = false): void {
      const mensaje = porErrores 
        ? '¡Has alcanzado el máximo de errores! El juego se reiniciará. ¿Quieres intentarlo de nuevo?' 
        : '¡Has ganado! El juego se reiniciará. ¿Estás listo?';
    
      const resultado = confirm(mensaje);
      if (resultado) {
        this.reiniciarJuego();
      }
    }
    
    private reiniciarJuego(): void {
      this.modoJuego = false;
      this.errores = 0;
      this.provinciasUsadas.clear();
      this.puntaje = 0;
      this.progreso = 0;
      this.provinciaActiva = this.seleccionarProvinciaAleatoria();
    }
  
  

  private onEachFeature(feature: any, layer: L.Layer): void {
    const pathLayer = layer as PathWithFeature;
    pathLayer.on({
      mouseover: (e: L.LeafletMouseEvent) => this.highlightFeature(e),
      mouseout: (e: L.LeafletMouseEvent) => this.resetHighlight(e),
    });
  }

  private highlightFeature(e: L.LeafletMouseEvent): void {
    const layer = e.target as PathWithFeature;

    layer.setStyle({
      fillOpacity: 1,
      fillColor: '#FFD700',
    });

    layer.bringToFront();
  }

  private resetHighlight(e: L.LeafletMouseEvent): void {
    const layer = e.target as PathWithFeature;

    const originalColor = layer.feature?.properties?.['originalColor'] || '#CCCCCC';
    layer.setStyle({
      fillOpacity: 0.7,
      fillColor: originalColor,
    });
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
