import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReparationService } from '../Service/reparation.service'
import { Depense } from '../Modele/depense'

@Component({
  selector: 'app-chiffre-affaire',
  templateUrl: './chiffre-affaire.component.html',
  styles: []
})
export class ChiffreAffaireComponent {
  chiffre_affaire!: Depense

  constructor(
    private router: Router,
    private reparationService: ReparationService

  ) { }

  jour = ""
  chiffre = 0
  mois = ""
  annee = ""
  // mL = [{ indice: 1, value: 'January' },
  //  {indice:2,value:'February'},
  //   {'March'}, 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  chiffre_jour() {
    this.reparationService.generateChiffreAffaireJour(this.jour).subscribe({
      next: data => {
        console.log(JSON.stringify(data))
        this.chiffre_affaire = data
      },
      error: e => {
        console.log(e.error.error)
      }

    });
  }

  chiffre_mois() {
    var myArray = this.mois.split("-");
    var le_mois = myArray[1]
    var l_anne = myArray[0]
    this.reparationService.generateChiffreAffaireJMois(le_mois, l_anne).subscribe({
      next: data => {
        console.log(JSON.stringify(data))
        this.chiffre_affaire = data
      },
      error: e => {
        console.log(e.error.error)
      }

    });
  }
}
