// app.routes.ts
import { Routes } from '@angular/router';

// Importar tus componentes
import { MapaEspanaComponent } from './components/mapas-base/mapa-espana/mapa-espana.component';
import { MapaMundoComponent } from './components/mapas-base/mapa-mundo/mapa-mundo.component';
import { MeridianoMovilComponent } from './components/mapas-educativos/meridiano-movil/meridiano-movil.component';

export const routes: Routes = [
  { path: '', redirectTo: '/mapa-mundo', pathMatch: 'full' }, // Ruta por defecto
  { path: 'mapa-espana', component: MapaEspanaComponent },
  { path: 'mapa-mundi', component: MapaMundoComponent },
  { path: 'meridiano-movil', component: MeridianoMovilComponent },
];

