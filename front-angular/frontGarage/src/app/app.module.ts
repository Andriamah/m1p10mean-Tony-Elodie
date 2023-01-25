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

@NgModule({
  declarations: [
    AppComponent,
    UtilisateurListComponent,
    FooterComponent,
    HeaderComponent,
    DepotVoitureComponent,
    NavBarComponent
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
