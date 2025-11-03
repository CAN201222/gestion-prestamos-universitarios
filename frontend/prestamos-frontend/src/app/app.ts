import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from './core/services/auth';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // Importación necesaria

@Component({
  selector: 'app-root',
  standalone: true, // <-- ¡Importante!
  imports: [
    CommonModule,   // <-- ¡Importante!
    RouterModule    // <-- ¡Importante!
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  currentUser$: Observable<User | null>;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser$ = this.authService.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}