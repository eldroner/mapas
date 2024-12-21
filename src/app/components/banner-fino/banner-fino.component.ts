import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-banner-fino',
  templateUrl: './banner-fino.component.html',
  styleUrls: ['./banner-fino.component.css'],
  standalone: true,
  imports: [CommonModule]  // Asegúrate de añadirlo aquí
})
export class BannerFinoComponent {
  messages = [
    'Bienvenido a Mapas Educativos. Aquí encontrarás un montón de mapas interesantes Bienvenido a Mapas Educativos. Aquí encontrarás un montón de mapas interesantes',
    'Explora mapas interactivos en nuestra página pensada para gente curiosa como tú. Te va a encantar',
    'Aprende sobre geografía de manera divertida y decubre un montón de cosas que no conocías.',
    'Mapa del Mundo, Antípodas, Meridiano Móvil, y muchas más cosas interesantes'
  ];
}