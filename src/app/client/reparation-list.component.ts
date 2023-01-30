import { Component,OnInit } from '@angular/core';
import {Reparation} from '../Modele/reparation'
import { Observable } from 'rxjs'
import {ReparationService} from '../Service/reparation.service'
import { Voiture } from '../Modele/voiture';
import {VoitureService} from '../Service/voiture.service'

@Component({
  selector: 'client-reparation',
  templateUrl: './reparation-list.component.html',
  styles: []
})
export class ReparationListComponent implements OnInit{
    reparations$: Observable<Reparation[]> = new Observable();
    voitures$ : Observable<Voiture[]> = new Observable();
 
  mail = localStorage.getItem('mail')?.toString();

    constructor(private reparationService: ReparationService,
      private voitureReparation: VoitureService
      ) { }

    ngOnInit(): void {
        this.fetchVoitureEtReparation();
      }
      
      
      private fetchVoitureEtReparation(): void {
        this.reparations$ = this.reparationService.getReparationsEncours(this.mail+"");
        this.voitures$ = this.voitureReparation.getVoitureEncours(this.mail+"");
      }
  }
