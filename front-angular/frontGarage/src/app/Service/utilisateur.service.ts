import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Utilisateur } from '../Modele/utilisateur';
 
@Injectable({
 providedIn: 'root'
})
export class UtilisateurService {
 private url = 'http://localhost:3000';
 private utilisateur$: Subject<Utilisateur[]> = new Subject();
 
 constructor(private httpClient: HttpClient) { }
 
//  private refreshUtilisateurs() {
//    this.httpClient.get<Utilisateur[]>(`${this.url}/employees`)
//      .subscribe(utilisateurs => {
//        this.utilisateur$.next(utilisateurs);
//      });
//  }
 
//  getEmployees(): Subject<Utilisateur[]> {
//    this.refreshUtilisateurs();
//    return this.utilisateur$;
//  }
 
 getUtilisateur(id: String): Observable<Utilisateur> {
   return this.httpClient.get<Utilisateur>(`${this.url}/utilisateur/_id=${id}`);
 }
 
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