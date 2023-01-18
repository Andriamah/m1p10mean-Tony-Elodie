import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { CrisisListComponent } from './crisis-list/crisis-list.component';
// import { HeroListComponent } from './hero-list/hero-list.component';
import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';


const appRoutes: Routes = [
  { path: 'utilisateur', component: UtilisateurListComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}