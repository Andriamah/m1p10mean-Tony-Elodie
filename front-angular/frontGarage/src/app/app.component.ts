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

  // ===Function
  inscription(){
    console.log(this.nom)

    let _utilisateur_ = {
      nom : this.nom,
      prenom : this.prenom,
      mail : this.mail,
      role : "client",
      mot_de_passe : this.mdp
    }
    this.utilisateurService.createUtilisateur(_utilisateur_).subscribe({
      next : data =>{
        console.log(data)
      },
      error : e =>{
        console.log(e.error.error)
      }
      
    })
  
    alert(this.nom)
  }
}
