import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';
import {DepotVoitureComponent} from './client/depot-voiture.component'
import {ReparationListComponent} from './client/reparation-list.component'
import {DetailReparationComponent} from './client/detail-reparation.component'
import {HistoriqueComponent} from './client/historique.component'
import {ReparationListeFComponent} from './finance/reparation-liste-f.component'
import {FormBeneficeComponent} from './finance/form-benefice.component'
import {FactureComponent} from './client/facture.component'
import {InscriprionComponent} from './utilisateur-list/inscription.component'

const appRoutes: Routes = [
  { path: 'acceuil', component: DepotVoitureComponent },
  { path: '', component: UtilisateurListComponent },
  { path: 'client-reparation', component: ReparationListComponent },
  { path: 'detail-reparation/:id', component: DetailReparationComponent },
  { path: 'historique', component: HistoriqueComponent },
  { path: 'acceuil-finance', component: ReparationListeFComponent },
  { path: 'benefice-finance', component: FormBeneficeComponent },
  { path: 'facture/:id', component: FactureComponent },
  { path: 'inscription', component: InscriprionComponent },


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