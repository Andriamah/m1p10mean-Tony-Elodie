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

  async getReparation(matricule: string | null): Promise<Subject<Detail[]>> {
    this.refreshReparation(matricule);
    return this.detail$;
  }

  async getReparationss(matricule: string | null): Promise<Subject<Detail[]>> {
    this.refreshReparation(matricule);
    return this.detail$;
  }

  finirreparation(details: Detail[], matricule: string | null) {
    console.log("ty detail" + JSON.stringify(details))
    console.log("matricule " + matricule)
    // var details = 
    //   [
    //     {
    //         "prix": 12000,
    //         "object": "Vitre",
    //         "etat": "0"
    //     },
    //     {
    //         "prix": 12000,
    //         "object": "Pneu",
    //         "etat": "0"
    //     },
    //     {
    //         "prix": 12000,
    //         "object": "Direction",
    //         "etat": "0"
    //     }
    // ]
    var body = {
      detail : details,
      matricule : matricule
    }
    
    this.httpClient.put<any>(`${this.url}/finir_detail_reparation`, body).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

async  updateEmployee(matricule: string | null, detail: Detail[]) {
    this.httpClient.put(`${this.url}/finir_detail_reparation/`, detail, { responseType: 'text' }).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }
}