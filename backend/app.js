const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect('mongodb+srv://' + process.env.DB_PSEUDO + ':' + process.env.DB_PASSWORD + '@sopekocko.8xqb0.mongodb.net/Sauce?retryWrites=true&w=majority', {
        userNewUrlPerser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch(() => console.log('Connexion à MongoDB échouée'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use(helmet());

const limiter = rateLimit({
    windowMS: 15 * 60 * 1000, //15 minutes
    max: 100 //limite à 100 requêtes, pour chaque IP, par tranche de 15 minutes (windowMS)
})


app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;