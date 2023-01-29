import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Utilisateur } from '../Modele/utilisateur';
import { Voiture } from '../Modele/voiture';
 
@Injectable({
 providedIn: 'root'
})
export class VoitureService {
 private url = 'http://localhost:3000';
 private voiture$: Subject<Voiture[]> = new Subject();
 
 constructor(private httpClient: HttpClient) { }
 
 private refreshVoitures() {
   this.httpClient.get<Voiture[]>(`${this.url}/reception_voiture`)
     .subscribe(voitures => {
       this.voiture$.next(voitures);
     });
 }
 
 getVoitures(): Subject<Voiture[]> {
   this.refreshVoitures();
   return this.voiture$;
 }
 
//  getEmployee(id: string): Observable<Employee> {
//    return this.httpClient.get<Employee>(`${this.url}/employees/${id}`);
//  }
 
 createUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
  console.log(utilisateur)
   return this.httpClient.post<Utilisateur>(`${this.url}/inscription`, utilisateur);
 }

 login(utilisateur: Utilisateur): Observable<Utilisateur> {
  console.log(utilisateur)
   return this.httpClient.post(`${this.url}/login`, utilisateur);
 }
 
//  updateEmployee(id: string, employee: Employee): Observable<string> {
//    return this.httpClient.put(`${this.url}/employees/${id}`, employee, { responseType: 'text' });
//  }
 
//  deleteEmployee(id: string): Observable<string> {
//    return this.httpClient.delete(`${this.url}/employees/${id}`, { responseType: 'text' });
//  }
}