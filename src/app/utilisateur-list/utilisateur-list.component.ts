import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../Modele/utilisateur';
import { Router } from '@angular/router';
import { UtilisateurService } from '../Service/utilisateur.service';

@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  // styles:['login_style.css']
})
export class UtilisateurListComponent  {
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
  error =''

  email = 'tfenoaina@gmail.com'
  pswd = '1234'

  

  login() {
    console.log(this.email)
    let _utilisateur_ = {
      _id:"null",
      nom: this.nom,
      prenom: this.prenom,
      mail: this.email,
      role: "client",
      mot_de_passe: this.pswd
    }
    this.utilisateurService.login(_utilisateur_).subscribe({
      next: data => {
        console.log("ito ooo " + data.role)
        if (data.role === "client") {
          // var value = data._id
          var value=''+data._id!
          var email=''+data.mail!
          localStorage.setItem('token', value)
          localStorage.setItem('mail', email)
          this.router.navigate(['/acceuil']);
        }
        
        else {
          this.error = "1"
          console.log("Tsy client")
        }
      },
      error: e => {
        console.log(e.error.error)
      }

    })
  }

}
