const Sauce = require('../models/Sauce');
const fs = require('fs');

//CRÉATION SAUCE
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée' }))
        .catch(error => res.status(400).json({ error }));
};

//MODIFICATION SAUCE
exports.modifySauce = (req, res, next) => {
    let sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };
    Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée' }))
        .catch(error => res.status(400).json({ error }));
};

//SUPPRESSION SAUCE
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée' }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
};


//AFFICHER SAUCE SÉLECTIONNÉE
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

//AFFICHER TOUTES LES SAUCES
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

//GESTION LIKES & DISLIKES
exports.likeDislikeSauce = (req, res, next) => {
    const sauceId = req.params.id;
    const userId = req.body.userId;
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {

                //DIFFÉRENTS CAS POSSIBLES
                switch (like) {
                    case 1:
                        console.log("l'uitilsateur aime");
                        break;
                    case -1:
                        console.log("l'uitilsateur n'aime pas");
                        break;
                    case 0:
                        console.log("annulation du choix");

                })
            .catch(error => res.status(404).json({ error }));
        }






}