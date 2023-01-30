import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Voiture } from '../Modele/voiture';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {
  private url = 'https://m1p10mean-tony-elodie-production.up.railway.app';
  private voiture$: Subject<Voiture[]> = new Subject();
  private voitur$: Subject<Voiture> = new Subject();


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

  private async refreshOneVoiture(matricule: String) {
    this.httpClient.get<Voiture>(`${this.url}/getOnevoiture/matricule=${matricule}`)
      .subscribe(voitures => {
        this.voitur$.next(voitures);
      });
  }

  getVoitureEncours(mail: String): Subject<Voiture[]> {
    this.refreshVoitureEncours(mail);
    return this.voiture$;
  }

  async getOnevoiture(matricule: String): Promise<Subject<Voiture>> {
   await this.refreshOneVoiture(matricule);
    return this.voitur$;
  }

   updateVoiture(mail: String,voiture: Voiture): Observable<Voiture> {
     return this.httpClient.put<Voiture>(`${this.url}/recuperer-voiture/mail=${mail}`,voiture);
   }
}