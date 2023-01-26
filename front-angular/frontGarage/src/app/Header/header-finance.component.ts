import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-finance',
  templateUrl: './header-finance.component.html',
  styles: []
})
export class HeaderFinanceComponent {
  constructor(
    private router: Router
  ) { }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/']);

  }
}
