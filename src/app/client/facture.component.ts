import { Component, OnInit } from '@angular/core';
import { Reparation } from '../Modele/reparation'
import { Observable, Subject } from 'rxjs'
import { ReparationService } from '../Service/reparation.service'
// import { Router } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Detail } from '../Modele/detail';
import { DetailService } from '../Service/detail.service'

@Component({
  selector: 'facture',
  templateUrl: './facture.component.html',
  styles: []
})
export class FactureComponent implements OnInit {

  reparations$: Observable<Reparation[]> = new Observable();
  la_reparation$: Observable<Reparation> = new Observable();
  _reparation !: Reparation;
  detail_$: Observable<Detail[]> = new Observable();


  constructor(private reparationService: ReparationService,
    private router: Router,
    private route: ActivatedRoute,
    private detailService: DetailService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') + "";
    if (!id) {
      alert('No id provided');
    }
    this.fetchEmployees(id);
  }


  fetchEmployees(id: String): void {
    this.reparationService.getReparationp(id).subscribe({
      next: data => {
        console.log(JSON.stringify(data) )
        this._reparation = data
        // this.detail_$ = data.detail
      },
      error: e => {
        console.log(e.error.error)
      }

    })
    this.detail_$ = this.detailService.getListeDetail(id);

  }
}
