const express = require('express');
const router = express.Router();

const { requireSignin, isAdmin, isAuth, isSeller } = require('../controllers/auth');
const { create, categoryById, read,update, remove,list } = require ('../controllers/category');
const { userById } = require('../controllers/user');

// create category 
router.post("/category/create/:userId",requireSignin,isAuth,isAdmin, create);
// get 
router.get("/category/:categoryId", read)
// update
router.put("/category/update/:categoryId/:userId",requireSignin,isAuth,isAdmin, update);
// delete
router.delete("/category/delete/:categoryId/:userId",requireSignin,isAuth,isAdmin, remove);
// list
router.get("/categories", list)

// params
router.param("userId",userById);
router.param ("categoryId", categoryById);

module.exports = router;