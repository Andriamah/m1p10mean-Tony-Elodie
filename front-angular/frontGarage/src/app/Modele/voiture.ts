export interface Voiture {
    matricule?: String,
    type?: String,
    marque?: String,
    utilisateur?: {
        nom?: String,
        prenom?: String,
        mail?: String
    },
    description?: String,
    statut?: String
}
