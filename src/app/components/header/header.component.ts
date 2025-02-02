import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 📌 Solo necesitamos RouterLink

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink], // 📌 Quitamos RouterModule
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {}
