import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';
import {DepotVoitureComponent} from './client/depot-voiture.component'


const appRoutes: Routes = [
  { path: 'acceuil', component: DepotVoitureComponent },
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