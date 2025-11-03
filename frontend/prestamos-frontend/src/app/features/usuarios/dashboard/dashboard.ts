import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User, AuthService } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  currentUser$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser;
  }
}