const express = require('express');
const router  = express.Router();
// controllers
const { signup, signin, signout, requireSignin, isAuth, isAdmin} = require('../controllers/auth');
const { userSignupValidator } = require('../validator');

//sign up
router.post("/signup",userSignupValidator, signup);
// signin
router.post("/signin", signin);
//signout
router.get("/signout", signout);

router.get("/require", requireSignin, (req, res)=>{
        res.status(200).json({
            meassage: "require"
        })
});

// export
module.exports =  router;