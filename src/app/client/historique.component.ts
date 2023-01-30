import { Component, OnInit } from '@angular/core';
import { Reparation } from '../Modele/reparation'
import { Observable } from 'rxjs'
import { ReparationService } from '../Service/reparation.service'
@Component({
  selector: 'historique',
  templateUrl: './historique.component.html',
  styles: []
})
export class HistoriqueComponent implements OnInit {
  reparations$: Observable<Reparation[]> = new Observable();

  constructor(private reparationService: ReparationService) { }

  // DECLARATION
  debut = ''
  fin = ''
  mail = localStorage.getItem('mail')?.toString();

  ngOnInit(): void {
    this.fetchEmployees();
  }

  private fetchEmployees(): void {
    this.reparations$ = this.reparationService.getReparationUtilisateu(this.mail+"");
  }

  recherche(){
    console.log("historique")
    this.reparations$ = this.reparationService.getHistoriques(this.mail+"",this.debut,this.fin);
  }
}
