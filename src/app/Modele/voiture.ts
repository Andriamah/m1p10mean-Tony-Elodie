import {Utilisateur} from './utilisateur'
export interface Voiture {
    matricule?: string,
    type?: string,
    marque?: string,
    utilisateur?: Utilisateur,
    description?: string,
    statut?: string
}
