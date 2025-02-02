import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 📌 Importa FormsModule
import { CommonModule } from '@angular/common'; // 📌 Importa CommonModule
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true, // 📌 Como es un componente standalone, debemos importar FormsModule aquí
  imports: [FormsModule, CommonModule] // 📌 Habilita ngModel en este componente
})
export class RegisterComponent {
  user = { username: '', email: '', password: '' };
  message = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.user).subscribe(
      response => {
        this.message = 'Registro exitoso!';
        console.log('Usuario registrado:', response);
      },
      error => {
        this.message = 'Error en el registro';
        console.error(error);
      }
    );
  }
}
