import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';


const appRoutes: Routes = [
  // { path: 'acceuil', component: UtilisateurListComponent },
  { path: '', component: UtilisateurListComponent },

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