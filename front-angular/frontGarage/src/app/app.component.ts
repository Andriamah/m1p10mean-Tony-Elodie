import { Component } from '@angular/core';
import { Utilisateur } from './utilisateur';
import { UtilisateurService } from './utilisateur.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  // ==constructeur
  constructor(private utilisateurService: UtilisateurService) { }


  // ===DECLARATION
  title = 'frontGarage';
  nom = ''
  prenom = ''
  mail = ''
  mdp = ''

  email = ''
  pswd = ''

  // ===Function
  inscription() {
    console.log(this.nom)

    let _utilisateur_ = {
      nom: this.nom,
      prenom: this.prenom,
      mail: this.mail,
      role: "client",
      mot_de_passe: this.mdp
    }
    this.utilisateurService.createUtilisateur(_utilisateur_).subscribe({
      next: data => {
        console.log(data)
      },
      error: e => {
        console.log(e.error.error)
      }

    })
  }

  login() {
    console.log(this.email)
    let _utilisateur_ = {
      nom: this.nom,
      prenom: this.prenom,
      mail: this.email,
      role: "client",
      mot_de_passe: this.pswd
    }
    this.utilisateurService.login(_utilisateur_).subscribe({
      next: data => {
        console.log(data)
      },
      error: e => {
        console.log(e.error.error)
      }

    })
  }
}
