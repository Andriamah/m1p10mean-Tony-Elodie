import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Utilisateur } from '../Modele/utilisateur';
import { Voiture } from '../Modele/voiture';
import { Reparation } from '../Modele/reparation';
import { Detail } from '../Modele/detail';
 
@Injectable({
 providedIn: 'root'
})
export class ReparationService {
 private url = 'http://localhost:3000';
 private detail$: Subject<Detail[]> = new Subject();
 
 constructor(private httpClient: HttpClient) { }
 
 private refreshReparation(matricule: string | null) {
   this.httpClient.get<Detail[]>(`${this.url}/reparation_voiture/matricule=${matricule}`)
     .subscribe(detail => {
       this.detail$.next(detail);
     });
 }
 
 getReparation(matricule: string | null): Subject<Detail[]> {
   this.refreshReparation(matricule);
   return this.detail$;
 }

 finirreparation(detail: Detail,matricule:string,): Observable<Utilisateur> {
  console.log(detail)
   return this.httpClient.post(`${this.url}/finir_detail_reparation/${matricule}`,detail);
 }
}