import {Utilisateur} from './utilisateur'
export interface Voiture {
    matricule?: String,
    type?: String,
    marque?: String,
    utilisateur?: Utilisateur,
    description?: String,
    statut?: String
}
