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

  async refreshReparation(matricule: string ) {
     this.httpClient.get<Detail[]>(`${this.url}/reparation_voiture/matricule=${matricule}`)
      .subscribe(detail => {
        this.detail$.next(detail);
      });
  }

  async getReparation(matricule: string ): Promise<Subject<Detail[]>> {
    await this.refreshReparation(matricule);
    return this.detail$;
  }

  async getReparationss(matricule: string ): Promise<Subject<Detail[]>> {
    this.refreshReparation(matricule);
    return this.detail$;
  }

  finirreparation(details: Detail[], matricule: string | null,avancement: string) {
    console.log("ty detail" + JSON.stringify(details))
    console.log("matricule " + matricule)
    var body = {
      detail : details,
      matricule : matricule,
      avancement :avancement
    } 
    this.httpClient.put<any>(`${this.url}/finir_detail_reparation`, body).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  async AjoutReparation(voiture: Voiture, details: Detail,) {
    console.log("ty detail" + JSON.stringify(details))
    // console.log("matricule " + matricule)
    var body = {
      voiture: voiture,
      detail: details,
      etat: "0",
      date_paiement: "",
      date_debut: new Date(),
      date_fin: "",
      avancement:"",
      total: null
    }
    this.httpClient.post<any>(`${this.url}/ajouter_reparation`, body).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }


}