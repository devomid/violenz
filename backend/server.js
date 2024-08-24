const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const violationRoutes = require('./routes/violationRoutes');

dotenv.config()
const mongoUrl = process.env.MONGOURI;
const portNumber = process.env.PORT;

// configs and middlwares
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:8081',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
}));

// routes
app.use('/user', userRoutes);
app.use('/violation', violationRoutes);

// DataBase
mongoose.connect(mongoUrl)
    .then(() => {
        app.listen(portNumber, () => {
            console.log(`server running on port: ${portNumber}`);
            console.log('DB connection success!');
        });
    })
    .catch((error) => {
        console.log(error);
    });