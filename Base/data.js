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
        "avancement": "0",
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
        "avancement": "0",
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
        "avancement": "0",
        "total": 655000
    }
];
db.reparation.insert(repair);
db.utilisateur.find().pretty();
db.voiture.find().pretty();
db.reparation.find().pretty();



db.voiture.find({ "statut": "0" }).pretty();
db.reparation.find({ "_id": ObjectId("63becbf457672d5b733e9219") }).pretty();
db.reparation.find({ "voiture.matricule": "1215TAB" }).pretty();

db.voiture.find({ "statut": "0", "utilisateur.nom": "Nancy" }).pretty()
db.reparation.update({ "_id": ObjectId("63c51f093a8c6451eefa84d7") }, { $set: { "etat": 0, "date_paiement": "" } })
db.voiture.deleteOne({ "_id": ObjectId("63c2ef15f377a6461c92fa7c") })

db.reparation.update({ "etat": "0" }, { $set: { "date_fin": new Date().toISOString().substring(0, 10) } })

// ty no mety CF par jour--------------------------
db.reparation.aggregate([
    { $group: { _id: "$date_debut", valeur: { $sum: "$total" } } }
]).pretty()
// ty no mety CF par jour---------------------------

db.reparation.aggregate([
    { $group: { _id: "$date_debut", valeur: { $sum: "$total" } } }
]).pretty()


db.reparayion.aggregate([{ $group: { _id: "$team", avg_val: { $avg: "$points" } } }])
db.reparation.aggregate([{
    $project: {
        avg: {
            $dateDiff: {
                startDate: "$date_debut",
                endDate: "$date_fin",
                unit: "day"
            }
        }
    }
}])


db.reparation.aggregate(
    [
        {
            $group:
            {
                _id: null,
                averageTime:
                {
                    $avg:
                    {
                        $dateDiff:
                        {
                            startDate: "$date_debut",
                            endDate: "$date_fin",
                            unit: "day"
                        }
                    }
                }
            }
        },
        {
            $project:
            {
                _id: 0,
                numDays:
                {
                    $trunc:
                        ["$averageTime", 1]
                }
            }
        }
    ]
)


db.reparation.aggregate(
    [
        {
            $project: {
                _id: 0,
                date_debut: 1,
                date_fin: 1,
                result: {
                    $subtract: [$date_fin, $date_debut]
                }
            }
        }
    ]
).pretty()




db.reparation.aggregate([
    {
        $project: {
            _id: 0,
            daysince: {
                $divide: [{ $subtract: [new Date().toISOString().substring(0, 10), $date_debut] }, 1000 * 60 * 60 * 24]
            }
        }
    }
]);

db.reparation.aggregate([{
    $project: {
        _id: 0,

    }
}])





db.reparation.aggregate([
    {
        $project: {
            $difference: {
                $divide: [
                    { $subtract: ["$date_debut", "$date_fin"] },
                    60 * 1000 * 60
                ]
            }
        }
    },
    {
        $group: {
            _id: null,
            totalDifference: { $sum: $difference }
        }
    },
    { $match: { totalDifference: { $gte: 20 } } }
])


db.reparation.aggregate([{ $addFields: { timeDiff: { $subract: [new Date().toISOString().substring(0, 10), "$date_debut"] } } }])
db.reparation.aggregate([{ $addFields: { timeDiff: { $subract: [5, 8] } } }])



db.reparation.find({ "etat": "0", "voiture.prenom": "Tony" }).pretty();



db.reparation.aggregate([{ $project: { _id: null, dateDifference: { $subtract: ["$date_fin", "$date_debut"] } } }])


db.reparation.aggregate([
    { $group: { _id: "$date_debut", valeur: { $sum: "$total" } } }
]).pretty()






