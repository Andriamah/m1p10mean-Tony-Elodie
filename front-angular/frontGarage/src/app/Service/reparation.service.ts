import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Reparation } from '../Modele/reparation';
import {Depense} from '../Modele/depense'
import { Chiffre } from '../Modele/chiffre';

@Injectable({
  providedIn: 'root'
})
export class ReparationService {
  private url = 'http://localhost:3000';
  private reparation$: Subject<Reparation[]> = new Subject();
  private moyenne$: Subject<Chiffre[]> = new Subject();

  _reparation_ !: Reparation;
  depense !: Depense

  constructor(private httpClient: HttpClient) { }

  private refreshReparationsFini() {
    this.httpClient.get<Reparation[]>(`${this.url}/reparation-fini`)
      .subscribe(reparations => {
        this.reparation$.next(reparations);
        console.log(reparations)
      });
  }

  getReparationsFini(): Subject<Reparation[]> {
    this.refreshReparationsFini();
    return this.reparation$;
  }
  
  private refreshReparationsEncours(mail:String) {
    this.httpClient.get<Reparation[]>(`${this.url}/reparation-afaire/mail=${mail}`)
      .subscribe(reparations => {
        this.reparation$.next(reparations);
      });
  }

  getReparationsEncours(mail:String): Subject<Reparation[]> {
    this.refreshReparationsEncours(mail);
    return this.reparation$;
  }

  private refreshReparationsByUtilisateur(mail: String) {
    this.httpClient.get<Reparation[]>(`${this.url}/reparation-historique/mail=${mail}`)
      .subscribe(reparations => {
        this.reparation$.next(reparations);
      });
  }

  getReparationUtilisateu(mail: String): Observable<Reparation[]> {
    this.refreshReparationsByUtilisateur(mail);
    return this.reparation$;;
  }

  private refreshHistoriques(nom: String, debut: String, fin: String) {
    this.httpClient.get<Reparation[]>(`${this.url}/historique-reparation-filtre/nom=${nom}&debut=${debut}&fin=${fin}`)
      .subscribe(reparations => {
        this.reparation$.next(reparations);
      });
  }


  getHistoriques(nom: String, debut: String, fin: String): Subject<Reparation[]> {
    this.refreshHistoriques(nom, debut, fin);
    return this.reparation$;
  }

  private refreshTempsMoyenne() {
    this.httpClient.get<Chiffre[]>(`${this.url}/temp-moyenne2`)
      .subscribe(moyenne => {
        this.moyenne$.next(moyenne);
      });
  }


  getTempsMoyenne(): Subject<Chiffre[]> {
    this.refreshTempsMoyenne();
    return this.moyenne$;
  }

  // getTempsMoyenne(): Observable<Chiffre[]> {
  //   return this.httpClient.get<Chiffre[]>(`${this.url}/temp-moyenne2`);
  // }

  async getFicheReparation(id: String) {
    this.httpClient.get<Reparation>(`${this.url}/fiche-reparations/_id=${id}`)
      .subscribe(reparations => {
        this._reparation_ = reparations
        console.log("eloooo " + this._reparation_.total)

      });
  }

  async getFicheReparationById(id: String): Promise<Reparation> {
    await this.getFicheReparation(id);
    console.log("anaty service   " + this._reparation_)

    return this._reparation_;
  }

  getReparationById(): Observable<Reparation[]> {
    return this.httpClient.get<Reparation[]>(`${this.url}/reparationGlobal`);
  }


  getReparationp(id: String): Observable<Reparation> {
    return this.httpClient.get<Reparation>(`${this.url}/fiche-reparations/_id=${id}`);
  }

  generateBenefice(mois: String,annee: String,depense : Number): Observable<Depense> {
    return this.httpClient.get<Depense>(`${this.url}/benefice-mois/mois=${mois}/annee=${annee}/depense=${depense}`);
  }

  generateChiffreAffaireJour(jour: String): Observable<Depense> {
    return this.httpClient.get<Depense>(`${this.url}/chiffre_affaire/jour=${jour}`);
  }

  generateChiffreAffaireJMois(mois: String,annee : String): Observable<Depense> {
    return this.httpClient.get<Depense>(`${this.url}/chiffre_affaire/mois=${mois}/annee=${annee}`);
  }
  

  updateReparation(id: String,reparation: Reparation): Observable<Reparation> {
    return this.httpClient.put<Reparation>(`${this.url}/sortire-voiture/_id=${id}`,reparation);
  }

  validerPaiment(id: String,reparation: Reparation): Observable<Reparation> {
    return this.httpClient.put<Reparation>(`${this.url}/valider-paiement/_id=${id}`,reparation);
  }

}