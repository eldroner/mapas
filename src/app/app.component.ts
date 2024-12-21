import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";  // Importar el header
import { BannerFinoComponent } from './components/banner-fino/banner-fino.component';  // Importa el componente

@Component({
  selector: 'app-root',
  standalone: true,  // Marca como standalone el componente principal también
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, BannerFinoComponent, HeaderComponent] // Importa BannerFinoComponent aquí
  // Importa BannerFinoComponent aquí
})
export class AppComponent {
  title = 'mapas-educativos';
}
