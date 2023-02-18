import passport from 'passport';
import userModel from '../../models/user.js';
import { GenerateToken } from '../../utils/index.js';

export function processLogin(req, res, next){
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        if(!user){
            return res.json({success: false, msg: 'ERROR: Authentication Failed'});
        }

        req.logIn(user, (err) => {
            if(err){
                console.error(err);
                res.end(err);
            }

            const authToken = GenerateToken(user);

            return res.json({
                success: true,
                msg: 'User Logged In Successfully',
                user: {
                    id: user._id,
                    displayName: user.displayName,
                    username: user.username,
                    emailAddress: user.emailAddress
                },
                token: authToken
            });
        })
    })(req, res, next);
}

export function processRegistration(req, res, next){
    let newUser = new userModel({
        //javascript destructing
        ...req.body
    });

    userModel.register(newUser, req.body.password, (err) =>{
        if (err) {
            if (err.name === 'UserExistsError') {
                console.error('ERROR: User Already Exists!')
            }

            console.log(err);

            return res.json({ success: false, msg: 'ERROR: Registration Failed!' });
        }

        return res.json({success: true, msg: 'User Registered Successfully'});
    })
}

export function processLogout(req, res, next){
    req.logOut( (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.json({success: true, msg: 'User Logged out Successfully'});
    })
}