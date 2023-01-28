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
        "statut": "1"
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
        "detail": [
            {
                "prix": 12000,
                "object": "Vitre",
                "etat": "0"
            }
        ],
        "etat": "0",
        "date_paiement": "",
        "date_debut": new Date(),
        "date_fin": "",
        "total": 12000
    },
    {
        "voiture": {
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
        "etat": "3",
        "date_paiement": "",
        "date_debut": new Date(),
        "date_fin": "",
        "total": 20000
    },
    {
        "voiture": {
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
        },
        "detail": [
            {
                "prix": 655000,
                "object": "Injecteur",
                "etat": "0"
            }
        ],
        "etat": "2",
        "date_paiement": "",
        "date_debut": new Date(),
        "date_fin": "",
        "total": 655000
    }
];
db.reparation.insert(repair);
db.utilisateur.find().pretty();
db.voiture.find().pretty();
db.reparation.find().pretty();



db.voiture.find({ "utilisateur.mail": "tfenoaina@gmail.com", "statut": "0" }).pretty();
db.voiture.find().pretty();



db.utilisateur.find({ "_id": ObjectId("63c5b19cdc2fba8e91905b8a") }).pretty();
db.reparation.find({ "_id": ObjectId("63d0eaf57038e3864eeb1235") }).pretty();
db.reparation.find({ "voiture.matricule": "1215TAB" }).pretty();

db.voiture.find({ "statut": "0", "utilisateur.nom": "Nancy" }).pretty()
db.reparation.update({ "_id": ObjectId("63d2a0062415c67de92f163b") }, { $set: { "date_debut": new Date("2022-02-29T00:00:00.000Z"), } })

db.voiture.deleteOne({ "_id": ObjectId("63c2ef15f377a6461c92fa7c") })

db.reparation.update({ "etat": "0" }, { $set: { "date_fin": new Date() } })

// ty no mety CF par jour--------------------------
db.reparation.aggregate([
    { $group: { _id: "$date_debut", valeur: { $sum: "$total" } } }
]).pretty()




db.reparation.aggregate([
    { $group: { _id: "$date_debut", valeur: { $sum: "$total" } } }
]).pretty()
// ty no mety CF par jour---------------------------


// ty no mety CF par Mois---------------------------
db.reparation.aggregate(
    [
        {
            $group:
            {
                _id: { month: { $month: "$date_debut" }, year: { $year: "$date_debut" } },
                month: { $month: "$date_debut" },
                totalAmount: { $sum: "$total" },
                count: { $sum: 1 }
            }
        }
    ]
)

// ty no mety CF par Mois---------------------------



db.reparation.aggregate([
    { $group: { _id: "$date_debut", valeur: { $sum: "$total" } } }
]).pretty()


db.reparation.aggregate([
    { $project: { month: { $month: '$date_debut' }, year: { $year: "$date_debut" }, valeur: { $sum: "$total" } } },
    { $match: { month: 1, year: 2023 } }
]);


db.reparation.aggregate([
    {
        $match: {
            date_debut: {
                $gte: new Date("2023-01-26"),
                $lt: new Date("2023-01-26 23:59:59")
            }
        }
    },
    { $group: { _id: "$date_debut", valeur: { $sum: "$total" } } }
])


db.reparation.aggregate([
    {
        $match: {
            "date_debut": {
                $gt: new Date("2022-01-26"),
                $lt: new Date("2024-01-26 23:59:59")
            }
        }
    },
    { $group: { _id: "$date_debut", valeur: { $sum: "$total" } } }
]).pretty()


db.reparation.aggregate([
    { $match: { date_debut: new Date("2023-01-26") } },
    { $group: { _id: "$date_debut", valeur: { $sum: "$total" } } }
]).pretty()

db.reparation.aggregate(
    [
        {
            $project:
            {
                _id: 0,
                averageTime:
                {
                    $avg:
                    {
                        $subtract:

                            [new date(),
                                $date_debut]

                    }
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
                date_fin: new Date(),
                result: {
                    $subtract: [new Date(), "$date_debut"]
                }
            }
        },
        {
            $project: {
                result: {
                    $avg: { "$result"}
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
                $divide: [{ $subtract: [new Date(), $date_debut] }, 60000]
            }
        }
    }
]);
// Vrai Moyenne-------------------------------------------------
db.reparation.aggregate([
    {
        $project: {
            difference: {
                $divide: [
                    { $subtract: [new Date(), "$date_debut"] },
                    60000
                ]
            }
        }
    },
    {
        $group: {
            _id: "_id",
            totalDifference: { $avg: "$difference" }
        }
    }
])
// Vrai Moyenne-------------------------------------------------


// Soustraction--------------------------------
db.reparation.aggregate([
    {
        $project: {
            hello: { $subtract: [new Date(), "$date_debut"] },
            difference: {
                $divide: [
                    { $subtract: [new Date(), "$date_debut"] },
                    60000
                ]
            }
        }
    }
])
// Soustraction-------------------------------- 



db.reparation.aggregate([{ $addFields: { timeDiff: { $subract: [new Date().toISOString().substring(0, 10), "$date_debut"] } } }])
db.reparation.aggregate([{ $addFields: { timeDiff: { $subract: [5, 8] } } }])



db.reparation.find({ "date_debut": {
    $gt: new Date("2023-01-26T01:00:00"),
    $lt: new Date("2023-01-26T23:59:59")
} }).pretty();

db.reparation.aggregate([
    { $match: { 
        "date_debut": {
            $gt: new Date("2023-01-26T01:00:00"),
            $lt: new Date("2023-01-26T23:59:59")
        } 
    } },
    { $group: { _id: "$date_debut", valeur: { $sum: "$total" } } }
]).pretty()



db.reparation.aggregate([{ $project: { _id: null, $dateDifference: $avg:{ $subtract: [new Date(), "$date_debut"] } } }])


db.reparation.aggregate([
    { $group: { _id: "$date_debut", valeur: { $sum: "$total" } } }
]).pretty()



// Moyenne à notre----------------------------------------------------
db.reparation.aggregate([
    {
        $group: {
            _id: null,
            avg_time: {
                $avg: {
                    $divide: [
                        $subtract: [
                            { $ifNull: [new Date(), 0] },
                            { $ifNull: ["$date_debut", 0] }
                        ], 6000
                    ]

                }
            }
        }
    }
])
// Moyenne à notre----------------------------------------------------
db.planning.aggregate(
    [
        { $project: { name: 1, workdays: { $divide: ["$hours", 8] } } }
    ]
)

// Recherche---------------------------------
db.reparation.find({
    date_debut: {
        $gte: ISODate("2022-01-29T00:00:00.000Z"),
        $lt: ISODate("2023-02-01T00:00:00.000Z")
    }
}).pretty()

// ---------------
db.data.find({
    day: {
        $gt: ISODate("2020-01-21"),
        $lt: ISODate("2020-01-24")
    }
}).pretty()
// ----------
db.reparation.find({
    "$date_debut": "2023-01-29T00:00:00.000Z"
}).pretty()
// Rercheche-------------------------------------------

db.reparation.find().pretty();











db.voiture.aggregate(
    [{ $match: { matricule: "1215TBL" } }]
);



db.reparation.aggregate([
    { $group: { _id: "$date_debut", valeur: { $sum: "$total" } } }
]).pretty()

ISODate("2023-01-26T15:45:09.974")

db.reparation.aggregate([
    { $match: { date_debut: ISODate("2023-01-26 15:45:09.974Z") } },
    { $group: { _id: "$date_debut", valeur: { $sum: "$total" } } }
])


db.reparation.aggregate([
    { $match: { date_debut: ISODate("2023-01-26 15:45:09.974Z") } }
])



reparationCollection.aggregate(
    [
        {
            $group:
            {
                _id: { month: { $month: "$date_debut" }, year: { $year: "$date_debut" } },
                totalAmount: { $sum: "$total" },
                count: { $sum: 1 }
            }
        }
    ]
)



db.reparation.aggregate([
    { $project: { month: { $month: '$date_debut' }, year: { $year: "$date_debut" }, valeur: { $sum: "$total" } } },
    { $match: { month: 1, year: 2023 } }
])