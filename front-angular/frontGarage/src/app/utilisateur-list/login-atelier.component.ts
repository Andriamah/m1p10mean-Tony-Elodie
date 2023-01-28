import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../Modele/utilisateur';
import { Router } from '@angular/router';
import { UtilisateurService } from '../Service/utilisateur.service';

@Component({
  selector: 'app-login-atelier',
  templateUrl: './login-atelier.component.html',
  // styles:['login_style.css']
})
export class LoginAtelierComponent  {
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

  email = 'andriamahanintsoelo@gmail.com'
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
        if (data.role === "atelier") {
          console.log("fiance tsika")
          // var value = data._id
          var value=''+data._id!
          localStorage.setItem('token', value)
          //ito ny Route an Tonyyy
          this.router.navigate(['/reception']);
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
