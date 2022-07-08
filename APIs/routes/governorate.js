const express = require('express');
const router = express.Router();

const { requireSignin, isAdmin, isAuth, isSeller } = require('../controllers/auth');
const { create, governorateById, read,update, remove,list } = require ('../controllers/governorate');
const { userById } = require('../controllers/user');

// create governorate 
router.post("/governorate/create/:userId",requireSignin,isAuth,isAdmin, create);
// get 
router.get("/governorate/:governorateId", read)
// update
router.put("/governorate/update/:governorateId/:userId",requireSignin,isAuth,isAdmin, update);
// delete
router.delete("/governorate/delete/:governorateId/:userId",requireSignin,isAuth,isAdmin, remove);
// list
router.get("/governorates", list)

// params
router.param("userId",userById);
router.param ("governorateId", governorateById);

module.exports = router;