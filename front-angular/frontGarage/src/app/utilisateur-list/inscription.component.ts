import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../Modele/utilisateur';
import { Router } from '@angular/router';
import { UtilisateurService } from '../Service/utilisateur.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  // styles:['login_style.css']
})
export class InscriprionComponent  {
  // ==constructeur
  constructor(private utilisateurService: UtilisateurService,
    private router: Router
  ) { }


  // ===DECLARATION
  title = 'frontGarage';
  nom = ''
  prenom = ''
  mail = ''
  mdp = ''

  // ===Function
  inscription() {
    console.log(this.nom)

    let _utilisateur_ = {
      _id:"null",
      nom: this.nom,
      prenom: this.prenom,
      mail: this.mail,
      role: "client",
      mot_de_passe: this.mdp
    }
    this.utilisateurService.createUtilisateur(_utilisateur_).subscribe({
      next: data => {
        console.log(data)
        this.router.navigate(['']);
      },
      error: e => {
        console.log(e.error.error)
      }

    })
  }

  
}
