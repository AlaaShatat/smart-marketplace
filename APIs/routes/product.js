const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { create, productById, read, list, updateProduct, removebyseller, listRelated, listCategories,listBySearch, photo, listSearch, update, remove } = require("../controllers/product");
const { requireSignin, isAuth,isSeller, isOwner,isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

// create product
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
// read a product or get 
router.get("/product/:productId", read ) 
// get all products
router.get("/products",list)
router.get("/products/search", listSearch);
// delete product 
router.delete("/product/delete/:productId", requireSignin, isOwner, removebyseller)
// update product
router.put("/product/update/:productId", requireSignin, isOwner, updateProduct)

router.delete(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);


// related id 
router.get("/products/related/:productId",listRelated)
router.get("/products/categories",listCategories)
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo)
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;