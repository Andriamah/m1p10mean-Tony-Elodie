import { Component } from '@angular/core';
import { Utilisateur } from './Modele/utilisateur';
import { UtilisateurService } from './Service/utilisateur.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
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
        console.log("ito ooo "+data.role)
        if (data.role === "client") {
          console.log("tkn manao root izy zao")
          this.router.navigate(['/acceuil']);
        } else {
          console.log("Tsy client")
        }
      },
      error: e => {
        console.log(e.error.error)
      }

    })
  }
}
