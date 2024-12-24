// app.routes.ts
import { Routes } from '@angular/router';

// Importar tus componentes
import { MeridianoMovilComponent } from './components/mapas-educativos/meridiano-movil/meridiano-movil.component';
import { AntipodasComponent } from './components/mapas-educativos/antipodas/antipodas.component';
import { HomeComponent } from './components/home/home.component';
import { MapaEspanaProvinciasComponent } from './components/mapas-educativos/espana/mapa-espana-provincias/mapa-espana-provincias.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'antipodas', component: AntipodasComponent },
  { path: 'meridiano', component: MeridianoMovilComponent },
  { path: 'espana-provincias', component: MapaEspanaProvinciasComponent },
];

