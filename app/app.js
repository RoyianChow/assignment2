import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session  from 'express-session';

// ES2022 Modules fix for __dirname
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Auth Step 1 - import passport modules
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';

// Auth Step 2 - define our authentication strategy
let localStrategy = passportLocal.Strategy;

import cors from 'cors';
import passportJWT from 'passport-jwt';

let JWTSTrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;


// Auth Step 3 - import the user model
import User from './models/user.js';

// Import Mongoose module
import mongoose from 'mongoose';

// Configuration Module
import { Secret, MongoURI } from '../config/index.js';

// Import Routes
import indexRouter from '../app/routes/index.js';
import contactRouter from '../app/routes/contacts.js';
import authRouter from '../app/routes/auth.js';

// Import API Routes
import authApiRouter from '../app/routes/api/auth-api.js';
import contactApiRouter from '../app/routes/api/contact-api.js';

// Complete DB Configuration
mongoose.connect(MongoURI);
const db = mongoose.connection;

// Database Listeners
db.on('open', () => console.log(`Connected to MongoDB`));
db.on('error', () => console.log("Mongo Connection Error"));

// Instantiate the express application
const app = express();

// Setup Express Middlewares

// EJS Setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// General Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors()); //used with Angular.

// Auth Step 4 - Setup Express Session
app.use(session({
    secret: Secret,
    saveUninitialized: false,
    resave: false
}));

// Auth Step 5 - Setup Flash
app.use(flash());

// Auth Step 6 - Initiliaze Passport and Session
app.use(passport.initialize());
app.use(passport.session());

// Auth Step 7 - Implementing the Auth Strategy
passport.use(User.createStrategy());

// Auth Step 8 - Setup serialization and deserialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Auth Step 9 - Enable JWT
let jwtOption = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: Secret
}

// JWT Passport Strategy
let strategy = new JWTSTrategy(jwtOption, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
            return done(null, user)
        })
        .catch(err => {
            return done(err, false);
        });
});

passport.use(strategy);

// Use Routes
app.use('/',indexRouter);
app.use('/', contactRouter);
app.use('/', authRouter);

// Enable API Routes
app.use('/api/auth', authApiRouter);
app.use('/api/contacts', passport.authenticate('jwt', {session: false}),  contactApiRouter);

export default app;