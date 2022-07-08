const express = require('express');
const { update } = require('lodash');
const router  = express.Router();
// controllers
const { requireSignin, isAuth, isAdmin, isSeller } = require('../controllers/auth');
const { userById , read, updateUser, purchaseHistory,recommendList, recommendProducts} = require('../controllers/user');

//routers
router.get("/secret/:userId", requireSignin,isAuth, isAdmin, (req, res)=>{
    res.json({
        user: req.profile,
        try: req.auth
    })
}
);
router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, updateUser);
router.get("/orders/by/user/:userId", requireSignin, isAuth, purchaseHistory);
router.get("/user/recommend/:userId", requireSignin, isAuth, recommendList);
//router.get("/user/recommend/products/:userId", requireSignin, isAuth, recommendProducts);


router.param('userId', userById);

// export
module.exports =  router;