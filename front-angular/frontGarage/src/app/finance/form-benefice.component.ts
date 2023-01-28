import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReparationService } from '../Service/reparation.service'
import { Depense } from '../Modele/depense'
import { Observable } from 'rxjs'


@Component({
  selector: 'app-benefice-finance',
  templateUrl: './form-benefice.component.html',
  styles: []
})
export class FormBeneficeComponent {
  _depense$: Observable<Depense> = new Observable();
  depenseeee!: Depense;


  constructor(
    private router: Router,
    private reparationService: ReparationService
  ) { }

  salaire = 0
  loyer = 0
  achat_piece = 0
  autres_depenses = 0
  benefice = 0
  mois = ""
  annee = ""

  generate() {
    var depense = this.achat_piece + this.autres_depenses + this.loyer + this.salaire
    // alert(depense)
    var myArray = this.mois.split("-");
    var le_mois = myArray[1]
    var l_anne = myArray[0]
    this.reparationService.generateBenefice(le_mois, l_anne, depense).subscribe({
      next: data => {
        console.log(JSON.stringify(data))
        this.depenseeee = data
        // this.detail_$ = data.detail
      },
      error: e => {
        console.log(e.error.error)
      }

    });
  }
}
