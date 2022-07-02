const express = require('express');
const router  = express.Router();
// controllers
const {  requireSignin, isAuth, isAdmin} = require('../controllers/auth');
const {setData, getData, updateStore} = require("../controllers/store");
const {userById} = require("../controllers/user")
//sign up
router.post("/store/set/:userId",requireSignin,isAuth,isAdmin, setData);
// signin
router.put("/store/update/:userId", requireSignin,isAuth,isAdmin, updateStore);
//signout
router.get("/store/get", getData);

router.get("/require", requireSignin, (req, res)=>{
        res.status(200).json({
            meassage: "require"
        })
});
router.param('userId', userById);

// export
module.exports =  router;