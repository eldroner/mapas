import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; // 📌 Importamos Router para redirección
import Swal from 'sweetalert2'; // 📌 Importamos SweetAlert

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf, NgClass]
})
export class RegisterComponent {
  user = { username: '', email: '', password: '' };
  message = '';
  success = false;
  loading = false;
  passwordValida = false;
  passwordInvalida = false;

  constructor(private authService: AuthService, private router: Router) {} // 📌 Inyectamos Router

  validarPassword() {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    this.passwordValida = regex.test(this.user.password);
    this.passwordInvalida = !this.passwordValida;
  }

  onSubmit() {
    if (this.passwordInvalida) {
      this.message = 'La contraseña no cumple con los requisitos.';
      this.success = false;
      return;
    }

    this.loading = true; // 🔄 Activar spinner de carga
    this.authService.register(this.user).subscribe(
      response => {
        this.success = true;
        console.log('Usuario registrado:', response);
        this.loading = false; // 🔄 Desactivar spinner

        // 📌 Mostrar SweetAlert después del registro exitoso
        Swal.fire({
          title: '¡Gracias por registrarte! 🎉',
          text: '¿Estás list@ para aprender divirtiéndote? 🚀',
          icon: 'success',
          confirmButtonText: '¡Vamos!',
          confirmButtonColor: '#007bff'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/']); // 📌 Redirigir al Home
          }
        });

      },
      error => {
        this.success = false;
        this.message = 'Error en el registro';
        console.error(error);
        this.loading = false; // 🔄 Desactivar spinner
      }
    );
  }
}
