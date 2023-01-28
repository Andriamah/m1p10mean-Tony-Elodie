import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../Modele/utilisateur';
import { Router } from '@angular/router';
import { UtilisateurService } from '../Service/utilisateur.service';

@Component({
  selector: 'app-login-finance',
  templateUrl: './login-finance.component.html',
  // styles:['login_style.css']
})
export class LoginFinanceComponent  {
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

  email = 'ratsimandavana@gmail.com'
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
        if (data.role === "financiere") {
          console.log("fiance tsika")
          // var value = data._id
          var value=''+data._id!
          localStorage.setItem('token', value)
          this.router.navigate(['/acceuil-finance']);
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
