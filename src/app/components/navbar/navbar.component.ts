import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  navLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: 'bi-speedometer2' },
    { label: 'Vacancies', path: '/vacancies', icon: 'bi-briefcase' },
    { label: 'Seafarers', path: '/seafarers', icon: 'bi-people' },
    { label: 'Vessels', path: '/vessels', icon: 'bi-ship' },
    { label: 'Pre-joining', path: '/pre-joining', icon: 'bi-person-check' },
    { label: 'Planning', path: '/planning', icon: 'bi-calendar-event' },
    { label: 'Payroll', path: '/payroll', icon: 'bi-cash-stack' },
    { label: 'Reports', path: '/reports', icon: 'bi-file-earmark-text' },
    { label: 'Setting', path: '/setting', icon: 'bi-gear' }
  ];

  startVoiceSearch() {
    alert('🎤 Voice search will be implemented here.');
  }
}
