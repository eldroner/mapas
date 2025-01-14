import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root', // Disponible en toda la aplicación
})
export class AlertService {
  constructor() {}

  mostrarExito(mensaje: string): void {
    Swal.fire({
      title: '¡Correcto!',
      text: mensaje,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'center',
    });
  }

  mostrarError(mensaje: string): void {
    Swal.fire({
      title: 'Incorrecto',
      text: mensaje,
      icon: 'error',
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'center',
    });
  }

  mostrarAdvertencia(mensaje: string): void {
    Swal.fire({
      title: 'Advertencia',
      text: mensaje,
      icon: 'warning',
      timer: 2500,
      showConfirmButton: false,
      toast: true,
      position: 'center',
    });
  }

  mostrarInfo(mensaje: string): void {
    Swal.fire({
      title: 'Información',
      text: mensaje,
      icon: 'info',
      timer: 2500,
      showConfirmButton: false,
      toast: true,
      position: 'center',
    });
  }
}
