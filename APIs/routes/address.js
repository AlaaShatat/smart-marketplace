const express = require('express');
const router = express.Router();

const { requireSignin, isAdmin, isAuth, isSeller } = require('../controllers/auth');
const { create, addressById, read,update, remove,list } = require ('../controllers/address');
const { userById } = require('../controllers/user');

// create address 
router.post("/address/create/:userId",requireSignin,isAuth,isAdmin, create);
// get 
router.get("/address/:addressId", read)
// update
router.put("/address/update/:addressId/:userId",requireSignin,isAuth,isAdmin, update);
// delete
router.delete("/address/delete/:addressId/:userId",requireSignin,isAuth,isAdmin, remove);
// list
router.get("/addresses", list)

// params
router.param("userId",userById);
router.param ("addressId", addressById);

module.exports = router;