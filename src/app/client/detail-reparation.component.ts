import { Component, OnInit } from '@angular/core';
import { Reparation } from '../Modele/reparation'
import { Observable} from 'rxjs'
import { ReparationService } from '../Service/reparation.service'
// import { Router } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Detail } from '../Modele/detail';
import { DetailService } from '../Service/detail.service'
import {VoitureService} from '../Service/voiture.service'
import { Voiture } from '../Modele/voiture';

@Component({
  selector: 'detail-reparation',
  templateUrl: './detail-reparation.component.html',
  styles: []
})
export class DetailReparationComponent implements OnInit {
  reparations$: Observable<Reparation[]> = new Observable();
  la_reparation$: Observable<Reparation> = new Observable();
  _reparation !: Reparation;
  _voiture !: Voiture;
  detail_$: Observable<Detail[]> = new Observable();
  mail = localStorage.getItem('mail')?.toString();



  constructor(
    private reparationService: ReparationService,
    private router: Router,
    private route: ActivatedRoute,
    private detailService: DetailService,
    private voitureService : VoitureService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') + "";
    if (!id) {
      alert('No id provided');
    }
    this.fetchEmployees(id);
  }
color = "blue"

  fetchEmployees(id: String): void {
    
    this.reparationService.getReparationp(id).subscribe({
      next: data => {
        console.log(data)
        this._reparation = data
        // this.detail_$ = data.detail
      },
      error: e => {
        console.log(e.error.error)
      }

    })
    this.detail_$ = this.detailService.getListeDetail(id);

  }

  recuperer_voiture(){
    const id = this.route.snapshot.paramMap.get('id') + "";

    console.log('bobob')
    this.reparationService.updateReparation(id,this._reparation).subscribe({
      next: data => {
        console.log(data)
        this._reparation = data
        // this.detail_$ = data.detail
      },
      error: e => {
        console.log(e.error.error)
      }

    })
    this.voitureService.updateVoiture(this.mail+"",this._voiture).subscribe({
      next: data => {
        console.log(data)
      },
      error: e => {
        console.log(e.error.error)
      }

    })
  }
}
