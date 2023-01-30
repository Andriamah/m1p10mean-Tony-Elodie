import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styles: []
})
export class HeaderComponent {
  constructor(
    private router: Router
  ) { }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('mail')
    this.router.navigate(['#/']);

  }
}
