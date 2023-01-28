import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReparationService } from '../Service/reparation.service'
import { Depense } from '../Modele/depense'
import { Chiffre } from '../Modele/chiffre';

@Component({
  selector: 'app-chiffre-affaire',
  templateUrl: './chiffre-affaire.component.html',
  styles: []
})
export class ChiffreAffaireComponent {
  chiffre_affaire!: Depense
  chiffre_du_jour!: Chiffre

  constructor(
    private router: Router,
    private reparationService: ReparationService

  ) { }

  jour = ""
  chiffre = 0
  mois = ""
  annee = ""

  chiffre_jour(){
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

  chiffre_mois(){
    this.reparationService.generateChiffreAffaireJMois(this.mois,this.annee).subscribe({
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
