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

  ngOnInit(): void {
    this.fetchEmployees();
  }

  private fetchEmployees(): void {
    this.reparations$ = this.reparationService.getReparations();
  }

  recherche(){
    this.reparations$ = this.reparationService.getHistoriques("Fenoaina",this.debut,this.fin);
  }
}
