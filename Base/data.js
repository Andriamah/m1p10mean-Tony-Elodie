use garage;


db.createCollection("utilisateur");
db.createCollection("voiture");
db.createCollection("reparation");

user = [
    {
        "nom": "Fenoaina",
        "prenom": "Tony",
        "mail": "tfenoaina@gmail.com",
        "role": "client",
        "mot_de_passe": "1234"

    },
    {
        "nom": "Hanintsoa",
        "prenom": "Elodie",
        "mail": "andriamahanintsoelo@gmail.com",
        "role": "atelier",
        "mot_de_passe": "1234"

    },
    {
        "nom": "Rindratiana",
        "prenom": "Holiniaina",
        "mail": "ratsimandavana@gmail.com",
        "role": "financiere",
        "mot_de_passe": "1234"
    }
];

db.utilisateur.insert(user);

car = [
    {
        "matricule": "1306TAB",
        "type": "4*4",
        "marque": "TOYOTA",
        "utilisateur": {
            "nom": "Fenoaina",
            "prenom": "Tony",
            "mail": "tfenoaina@gmail.com"
        },
        "description": "Pneu crevee et vitesse coince",
        "statut": "0"
    },
    {
        "matricule": "1306TAB",
        "type": "4*4",
        "marque": "TOYOTA",
        "utilisateur": {
            "nom": "Fenoaina",
            "prenom": "Tony",
            "mail": "tfenoaina@gmail.com"
        },
        "description": "Vitre casse",
        "statut": "1"
    },
    {
        "matricule": "1215TAB",
        "type": "4*4",
        "marque": "TOYOTA",
        "utilisateur": {
            "nom": "Hanintsoa",
            "prenom": "Elodie",
            "mail": "andriamahanintsoelo@gmail.com"
        },
        "description": "Injecteur nitsifotra",
        "statut": "0"
    }
];
db.voiture.insert(car);

repair = [
    {
        "voiture": {
            "matricule": "1306TAB",
            "nom": "Fenoaina",
            "prenom": "Tony",
            "mail": "tfenoaina@gmail.com"
        },
        "detail": [
            {
                "prix": 12000,
                "object": "Vitre",
                "etat": "0"
            }
        ],
        "etat": "0",
        "date_paiement": "",
        "date_debut": new Date().toISOString().substring(0, 10),
        "date_fin": "",
        "total": 12000
    },
    {
        "voiture": {
            "matricule": "1306TAB",
            "nom": "Fenoaina",
            "prenom": "Tony",
            "mail": "tfenoaina@gmail.com"
        },
        "detail": [
            {
                "prix": 5000,
                "object": "Pneu",
                "etat": "0"
            },
            {
                "prix": 15000,
                "object": "Vitesse",
                "etat": "0"
            }
        ],
        "etat": "0",
        "date_paiement": "",
        "date_debut": new Date().toISOString().substring(0, 10),
        "date_fin": "",
        "total": 20000
    },
    {
        "voiture": {
            "matricule": "1215TAB",
            "nom": "Hanintsoa",
            "prenom": "Elodie",
            "mail": "andriamahanintsoelo@gmail.com"
        },
        "detail": [
            {
                "prix": 655000,
                "object": "Injecteur",
                "etat": "0"
            }
        ],
        "etat": "0",
        "date_paiement": "",
        "date_debut": new Date().toISOString().substring(0, 10),
        "date_fin": "",
        "total": 655000
    }
];
db.reparation.insert(repair);

db.utilisateur.find().pretty();
db.voiture.find().pretty();
db.reparation.find().pretty();

db.voiture.find({ "statut": "0" }).pretty();
db.reparation.find({ "_id": ObjectId("63becbf457672d5b733e9219") }).pretty();
db.reparation.find({ "voiture.matricule": "1215TAB"}).pretty();

// ty no mety--------------------------
db.reparation.aggregate([
    { $group: { _id: "$date_debut", valeur: { $sum: "$total" } } }
]).pretty()
// ty no mety---------------------------

//






