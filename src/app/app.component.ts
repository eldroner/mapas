import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HeaderComponent } from "./components/header/header.component";  // Importar el header


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent],  // Importar RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mapas-educativos';
}
