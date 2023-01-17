import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Utilisateur } from './utilisateur';
 
@Injectable({
 providedIn: 'root'
})
export class UtilisateurService {
 private url = 'http://localhost:3000';
 private utilisateur$: Subject<Utilisateur[]> = new Subject();
 
 constructor(private httpClient: HttpClient) { }
 
 private refreshUtilisateurs() {
   this.httpClient.get<Utilisateur[]>(`${this.url}/employees`)
     .subscribe(utilisateurs => {
       this.utilisateur$.next(utilisateurs);
     });
 }
 
 getEmployees(): Subject<Utilisateur[]> {
   this.refreshUtilisateurs();
   return this.utilisateur$;
 }
 
//  getEmployee(id: string): Observable<Employee> {
//    return this.httpClient.get<Employee>(`${this.url}/employees/${id}`);
//  }
 
 createUtilisateur(utilisateur: Utilisateur): Observable<string> {
   return this.httpClient.post(`${this.url}/inscription`, utilisateur, { responseType: 'text' });
 }
 
//  updateEmployee(id: string, employee: Employee): Observable<string> {
//    return this.httpClient.put(`${this.url}/employees/${id}`, employee, { responseType: 'text' });
//  }
 
//  deleteEmployee(id: string): Observable<string> {
//    return this.httpClient.delete(`${this.url}/employees/${id}`, { responseType: 'text' });
//  }
}