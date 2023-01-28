import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs'
import {Reparation} from '../Modele/reparation'
import {ReparationService} from '../Service/reparation.service'



@Component({
  selector: 'app-reparation-finance',
  templateUrl: './reparation-liste-f.component.html',
  styles: []
})
export class ReparationListeFComponent implements OnInit {

  reparations$: Observable<Reparation[]> = new Observable();
  _reparation !: Reparation;


  constructor(
    private reparationService: ReparationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fetchReparationFini();
  }
  fetchReparationFini() { 
    this.reparations$ = this.reparationService.getReparationsFini();
  }
  payer(argument : any){
    alert(argument)
    // const id = this.route.snapshot.paramMap.get('id') + "";
    // alert(id)
    this.reparationService.validerPaiment(argument,this._reparation).subscribe({
      next: data => {
        console.log(data)
      },
      error: e => {
        console.log(e.error.error)
      }

    })
  }

}
