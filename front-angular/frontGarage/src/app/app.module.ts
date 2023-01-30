import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
import {ChiffreAffaireComponent} from './finance/chiffre-affaire.component'
import {TempReparationComponent} from './finance/temp_moyenne.component'
import {LoginAtelierComponent} from './utilisateur-list/login-atelier.component'
import {LoginFinanceComponent} from './utilisateur-list/login-finance.component'
import { DragDropModule } from '@angular/cdk/drag-drop'
import {HeaderAtelierComponent} from './Header/header-atelier.component'
import {DiagnosticComponent} from './diagnostic/diagnostic.component'
import {ReceptionComponent} from './reception/reception.component'
import {ReparartionComponent} from './reparartion/reparartion.component'
import { CommonModule } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    InscriprionComponent,
    ChiffreAffaireComponent,
    TempReparationComponent,
    LoginFinanceComponent,
    LoginAtelierComponent,
    HeaderAtelierComponent,
    DiagnosticComponent,
    ReceptionComponent,
    ReparartionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressBarModule
  ],
  providers: [ { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
 })
 export class AppModule { 

 }
