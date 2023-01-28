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

  private refreshVoitureEncours(mail: String) {
    this.httpClient.get<Voiture[]>(`${this.url}/voitures-encours-client/mail=${mail}`)
      .subscribe(voitures => {
        this.voiture$.next(voitures);
      });
  }

  getVoitureEncours(mail: String): Subject<Voiture[]> {
    this.refreshVoitureEncours(mail);
    return this.voiture$;
  }

   updateVoiture(mail: String,voiture: Voiture): Observable<Voiture> {
     return this.httpClient.put<Voiture>(`${this.url}/recuperer-voiture/mail=${mail}`,voiture);
   }
}