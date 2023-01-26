import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';
import { ReceptionComponent } from './reception/reception.component';
import { ReparartionComponent } from './reparartion/reparartion.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';

@NgModule({
  declarations: [
    AppComponent,
    UtilisateurListComponent,
    ReceptionComponent,
    ReparartionComponent,
    DiagnosticComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
 })
 export class AppModule { 

 }
