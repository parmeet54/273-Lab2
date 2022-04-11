const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user.model')
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

// Saves the sign up information to the database
passport.use(
    'signup',
    new localStrategy(
        {
            usernameField:'username',
            passwordField:'password',
            passReqToCallback:true
        },

        async(req, username,password, done) => {
            try{
                const email = req.body.email;
                const name = req.body.name;
                const image = req.body.image;
                // const about = req.body.about;
                // const city = req.body.city;
                // const address = req.body.address;
                // const country = req.body.country;
                // const dob = req.body.dob;
                //const phone_no = req.body.phone_no;

                const user = await UserModel.create({username, password, email, name, image});

                return done(null, user);
            }
            catch(error){
                return done(error);
            }
        }
    )
)

// Login and authenticates
passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
    
        }, 

        async(username, password, done) => {
            try{
                const user = await UserModel.findOne({username:username});

                if(!user){
                    return done(null, false, {message: 'User does not exist'});
                }

                const validate = await user.isValidPassword(password);

                if(!validate){
                    return done(null, false, {message: 'Wrong Password'});
                }

                return done(null, user, {message: 'Login Successful'});
            }
            catch(error){
                return done(error);
            }
        }
    )
);

// Verify Token
passport.use(
    new JWTStrategy(
        {
            secretOrKey:'TOP_SECRET',
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
        },
        async (token, done) => {
            try{
                return done(null, token.user);
            }
            catch(error){
                done(error);
            }
        }
    )
)