import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Reparation } from '../Modele/reparation';
 
@Injectable({
 providedIn: 'root'
})
export class ReparationService {
 private url = 'http://localhost:3000';
 private reparation$: Subject<Reparation[]> = new Subject();
 private _reparation$: Subject<Reparation> = new Subject();
  _reparation_ !: Reparation ;

 
 constructor(private httpClient: HttpClient) { }


 private refreshReparations() {
    this.httpClient.get<Reparation[]>(`${this.url}/reparationGlobal`)
      .subscribe(reparations => {
        this.reparation$.next(reparations);
      });
  }
  
  private refreshHistoriques(nom:String,debut:String,fin:String) {
    this.httpClient.get<Reparation[]>(`${this.url}/historique-reparation/nom=${nom}&debut=${debut}&fin=${fin}`)
      .subscribe(reparations => {
        this.reparation$.next(reparations);
      });
  }

  async getFicheReparation(id:String) {
    this.httpClient.get<Reparation>(`${this.url}/fiche-reparations/_id=${id}`)
      .subscribe(reparations => {
        this._reparation_ = reparations
        console.log("eloooo "+this._reparation_.total)

      });
  }

  getReparations(): Subject<Reparation[]> {
    this.refreshReparations();
    return this.reparation$;
  }

  
  getHistoriques(nom:String,debut:String,fin:String): Subject<Reparation[]> {
    this.refreshHistoriques(nom,debut,fin);
    return this.reparation$;
  }
 
 getReparationById(): Observable<Reparation[]> {
    return this.httpClient.get<Reparation[]>(`${this.url}/reparationGlobal`);
  }

  getReparationp(id:String): Observable<Reparation> {
    return this.httpClient.get<Reparation>(`${this.url}/fiche-reparations/_id=${id}`);
  }

  async getFicheReparationById(id:String): Promise<Reparation> {
    await this.getFicheReparation(id);
    console.log("anaty service   "+this._reparation_)

    return this._reparation_;
  }

}