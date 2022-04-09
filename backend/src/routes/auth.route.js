const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// User Signup
router.post(
    '/signup',
    passport.authenticate('signup', {session:false}),

    async(req, res, next) => {

        console.log("\nSignup successfull for: " , req.user.username)
        res.status(200).send({
            message:'Signup Successful',
            user:req.user
        });
    }
);


router.post(
    '/login',

    async(req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try{
                    if(err || !user){
                        const error = new Error('An Error Occurred');

                        res.status(400).send("Wrong username/password combination");
                        return next("\nWrong username/password combination");
                        return next(error);
                    }

                    req.login(
                        user, 
                        {session:false},

                        async(error) => {
                            if(error) return next(error);

                            const body = {_id:user._id, username:user.username};
                            const token = jwt.sign({user:body}, 'TOP_SECRET' , {
                                expiresIn: 1008000
                            });

                            // return res.json({
                            //     token:token,
                            //     user:user.username,
                            //     message:'Login Successful'
                            // });
                            console.log("\nLogin Successful for: ", user.username);
                            return res.status(200).send({token});
                        }
                    );
                }
                catch(error){
                    return next(error);
                }
            }
        )(req, res, next);
    }
)

module.exports = router;