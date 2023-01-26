import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';
import {FooterComponent} from './Footer/footer.component';
import {HeaderComponent} from './Header/header.component'
import {DepotVoitureComponent} from './client/depot-voiture.component'
import {NavBarComponent} from './Header/nav-bar.component'
import {ReparationListComponent} from './client/reparation-list.component'
import {DetailReparationComponent} from './client/detail-reparation.component'
import {HistoriqueComponent} from './client/historique.component'
import {HeaderFinanceComponent} from './Header/header-finance.component'
import {ReparationListeFComponent} from './finance/reparation-liste-f.component'
import {FormBeneficeComponent} from './finance/form-benefice.component'
import {FactureComponent} from './client/facture.component'
import {InscriprionComponent} from './utilisateur-list/inscription.component'

@NgModule({
  declarations: [
    AppComponent,
    UtilisateurListComponent,
    FooterComponent,
    HeaderComponent,
    DepotVoitureComponent,
    NavBarComponent,
    ReparationListComponent,
    DetailReparationComponent,
    HistoriqueComponent,
    HeaderFinanceComponent,
    ReparationListeFComponent,
    FormBeneficeComponent,
    FactureComponent,
    InscriprionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
 })
 export class AppModule { 

 }
