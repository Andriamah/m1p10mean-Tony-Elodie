
import {Voiture} from './voiture'
export interface Reparation {
    _id?:String,
    voiture: Voiture,
    detail: [
        {
            prix?: Number,
            object?: String,
            etat?: String
        }
    ],
    etat?: String,
    date_paiement?: Date
    date_debut?: Date,
    date_fin?: Date,
    total?: Number
// =======
// export interface Reparation {
//     matricule?:String,
//     type?:String,
//     marque?:String,
//     utilisateur?:String,
//     description?:String,
//     statut?: String
// >>>>>>> Front-Tony

}
