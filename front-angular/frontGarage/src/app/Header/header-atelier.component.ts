import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-atelier',
  templateUrl: './headeratelier.html',
  styles: []
})
export class HeaderAtelierComponent {
  constructor(
    private router: Router
  ) { }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['#/']);
  }
}
