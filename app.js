// Install dependencies
const express = require('express');
const app = express();
const path = require('path');
const User = require('./user');
const passport = require('passport');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const LocalStrategy = require('passport-local').Strategy
const sequelize = require('./database');


const sessionStore = new SequelizeStore({
    db: sequelize,
});

sessionStore.sync();

passport.serializeUser((user, done) => {
    done(null, user.email)
})

passport.deserializeUser((email, done) => {
    User.findOne({ where: { email: email } }).then((user) => {
        done(null, user)
    })
})

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async function (email, password, done) {
            if(!email || !password) {
                done('Email and password required', null)
                return
            }

            const user = await User.findOne({ where: { email: email }})

            if(!user) {
                done('User not found', null)
                return
            }

            const valid = await user.isPasswordValid(password)

            if(!valid) {
                done('Email and password do not match', null)
                return
            }

            done(null, user)
        }
    )
)

// Provide session management handle guide for Express app
app.use(
    session({
        secret: 'asdasdsad12321zxcs',
        resave: false,
        saveUninitialized: true,
        name: 'YOUR_DB_NAME',
        cookie: {
            secure: false, // On localhost
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        },
        store: sessionStore,
    }),
    passport.initialize(),
    passport.session()
)

// Call sync() method
User.sync({ alter: true })
app.set('view engine', 'pug')
app.set('views', path.resolve(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))


// Index section
app.get('/', (req, res) => req.session.passport ? res.render('index') : res.render('signup'))

// Login section
app.get('/login', (req, res) => req.session.passport ? res.render('index') : res.render('login'))

// Logout section
app.get('/logout', async (req, res) => {
    req.logout();
    req.session.destroy();
    return res.redirect('/')
});

// Register form handler
app.post('/register', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.create({ email, password })

        req.login(user, (err) => {
            if (err) return res.render('error', { message: err });
            return res.redirect('/');
        })
    } catch (err) {
        res.statusCode = 500;
        let message = 'An error occurred';
        if (err.name === 'SequelizeUniqueConstraintError') {
            message = 'User already exists. Use login instead.'
        }
        res.render('error', { message})
    }
})

// Login logic
app.post('/login', async (req, res) => {
    passport.authenticate('local', (err, user) => {
        if (err) return res.render('error', { message: err })
        if (!user) return res.render('error', { message: 'No user matching credentials' })

        req.login(user, (err) => {
            if (err) return res.render('error', { message: error })
            return res.redirect('/')
        })
    })(req, res)
})

app.listen(3001, () => console.log('Server ready'))