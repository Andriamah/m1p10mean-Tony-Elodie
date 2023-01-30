import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Detail } from '../Modele/detail';
 
@Injectable({
 providedIn: 'root'
})
export class DetailService {
 private url = 'https://m1p10mean-tony-elodie-production.up.railway.app';
 private detail$: Subject<Detail[]> = new Subject();
 
 constructor(private httpClient: HttpClient) { }
 
 private refreshHistoriques(id:String) {
    this.httpClient.get<Detail[]>(`${this.url}/fiche-reparations-detail/_id=${id}`)
      .subscribe(details => {
        this.detail$.next(details);
      });
  }

 getListeDetail(id:String): Observable<Detail[]> {
    this.refreshHistoriques(id);
    return this.detail$;
    // return this.httpClient.get<Detail[]>(`${this.url}/fiche-reparations-detail/_id=${id}`);
  }
}