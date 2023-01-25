import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Voiture } from '../Modele/voiture';
 
@Injectable({
 providedIn: 'root'
})
export class VoitureService {
 private url = 'http://localhost:3000';
 private voiture$: Subject<Voiture[]> = new Subject();
 
 constructor(private httpClient: HttpClient) { }
 
 createVoiture(voiture: Voiture): Observable<Voiture> {
   return this.httpClient.post<Voiture>(`${this.url}/depotvoiture`, voiture);
 }
}