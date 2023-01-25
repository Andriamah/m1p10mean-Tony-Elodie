import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../Service/utilisateur.service'
import { Router } from '@angular/router';
import { Utilisateur } from '../Modele/utilisateur';
import { VoitureService } from '../Service/voiture.service';


@Component({
    selector: 'app-depot-voiture',
    templateUrl: './depot-voiture.component.html',
    styles: []
})
export class DepotVoitureComponent {
    type = ""
    matriculation = ""
    marque = ""
    description = ""
    utilisateur = localStorage.getItem('token')?.toString();
    // ==constructeur
    constructor(
        private utilisateurService: UtilisateurService,
        private voitureService: VoitureService,
        private router: Router,
    ) { }

    getLogger() {
        this.utilisateurService.getUtilisateur("" + this.utilisateur).subscribe({
            next: data => {
                let user = {
                    nom: data.nom,
                    prenom: data.prenom,
                    mail: data.mail
                }
                return JSON.stringify(user)
            },
            error: e => {
                console.log(e.error.error)
            }

        })
    }

    depotVoiture() {
        let voiture = {}
        this.utilisateurService.getUtilisateur("" + this.utilisateur).subscribe({
            next: data => {
                let user = {
                    nom: data.nom,
                    prenom: data.prenom,
                    mail: data.mail
                }
                voiture = {
                    matricule: this.matriculation,
                    type: this.type,
                    marque: this.marque,
                    utilisateur: {
                        nom: data.nom,
                        prenom: data.prenom,
                        mail: data.mail
                    },
                    description: this.description,
                    statut: "0"
                }
                this.voitureService.createVoiture(voiture).subscribe({
                    next: data => {
                        console.log("voiture " + voiture)

                        console.log(data)
                    },
                    error: e => {
                        console.log(e.error.error)
                    }

                })
                console.log(voiture)
            },
            error: e => {
                console.log(e.error.error)
            }

        })


    }

}
