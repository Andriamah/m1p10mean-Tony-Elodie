import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { ReceptionComponent } from './reception/reception.component';
import { ReparartionComponent } from './reparartion/reparartion.component';

import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';


const appRoutes: Routes = [
  // { path: 'acceuil', component: UtilisateurListComponent },
  // { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: '', component: UtilisateurListComponent },
  { path: 'reception', component: ReceptionComponent },
  { path: 'diagnostic', component: DiagnosticComponent },
  { path: 'reception/reparation/:matricule', component: ReparartionComponent },

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