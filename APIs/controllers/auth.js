const User = require('../models/user');
const jwt = require('jsonwebtoken'); // to genertate signed token
//const expressJwt= require('express-jwt'); // for authorization
const { expressjwt, ExpressJwtRequest } = require("express-jwt");
const { errorHandler} = require('../helpers/dbErrorHandler');


// sign up
exports.signup = (req, res) =>{
    //console.log("req.body", req.body);
    const user =new User(req.body);
    user.save((error, user) => {
        if(error){ 
            console.log(error)
            return  res.status(400).json({
            error: errorHandler(error)
            
             });
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({
            user
        });
    });

};
exports.signin = (req, res)=>{
    // find the user based on email
    
    const {email, password} = req.body;
    User.findOne({email}, (err, user)=>{
        if(err || !user)
        {
            return res.status(400).json({
                error: "User with that email doesn't exist! "
            });
        }
        // if user is found make sure that is the same password
        
        //  create auth method in teh user model 
        if(!user.authenticate(password)){
            return res.status(401).json ({
                error: "Email and password dont match"
            });
        }
        // generate token
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET);
        //persist the token as 't' in cookie with expiry date 
        res.cookie("t", token, {expire: new Date() + 9999});
        // return response with user and token to the frontend client 
        const{ _id, name, email, role } = user;
        return res.status(200).json({token, user: {_id, name, email, role } });

    });

};

// signout
exports.signout = (req, res)=>{
    // clear cookie
    res.clearCookie("t");
    res.json({message:" Signout Success" });
};
// require signin
// just for authentication to make sure that is there is a user 
exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: 'auth'
});
// is auth 
exports.isAuth = (req, res, next ) =>{
    // auth is the user signed in 
    // profile is the requested 
    // so we need to match the signed in with the requested if they are the same 
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
        return res.status(403).json({
            error: "Access denied"
        });
    }
    console.log("requested" + req.profile._id);
    console.log("signed" + req.auth._id);

    next();

};
// is seller
exports.isSeller = (req, res, next ) =>{
    // auth is the user signed in 
    // profile is the requested 
    // so we need to match the signed in with the requested if they are the same
    if(!req.auth.isSeller){
        return res.status(403).json({
            error: "Access denied, not a seller"
        });
    }
    next();

};
// owner 
exports.isOwner = (req, res, next) =>{
    // check auth user and the owner of the product 
    console.log("owner "+ req.product.owner);
    if(req.auth._id != req.product.owner)
    {
        console.log("auth "+req.auth._id);
        console.log("owner "+req.product.owner);
        
        return res.status(403).json({
            error: "Access denied, not the owner"
        });
    }
    next();
}
// is admin 
exports.isAdmin = (req, res, next) =>{
    if (req.auth.role == 0){
        // it should be auth as auth is the user signed in  
        return res.status(403).json({
            error : "Admin resource! Access denied"
        });
    }
    next ();
};