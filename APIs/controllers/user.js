const User = require('../models/user');
const {Order} = require("../models/order");
const Product = require("../models/product");
const {errorHandler} = require("../helpers/dbErrorHandler");
//exports
exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        
        next();
    });
};
exports.read =(req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.status(200).json(req.profile)
};

exports.updateUser =(req, res) => {
    User.findOneAndUpdate({_id: req.profile._id},{$set: req.body}, {new: true}, (err, user) =>{
        if (err){
            return res.status(400).json({
                error :" error not allowed"
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.status(200).json(user)
    })

}

exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];

    req.body.order.products.forEach(item => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        });
    });

    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { history: history } }, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update user purchase history'
            });
        }
        next();
    });
};
exports.recommendUser = (req, res, next) => {
    let recommendation = [];

    req.body.order.products.forEach(item => {
        recommendation.push({
            category: item.category,
        });
    });

    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { recommendation: recommendation } }, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update user recommendation'
            });
        }
        next();
    });
};

exports.purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('user', '_id name')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};

// the recommended categories
exports.recommendList = (req, res) => {
    User.findById({_id: req.profile._id})
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(data.recommendation);
        });
};
// recommended products
/*
exports.recommendProducts = (req, res)=>{
    let limit = req.query.limit? parseInt(req.query.limit) : 6;
    console.log(req.profile.recommendation)
    
    for(var i = 0; i<req.profile.recommendation.length; i++){
        console.log(req.profile.recommendation[i].category)
        Product.find({ category : req.profile.recommendation[i].category})
        .limit(limit)
        .populate("category","_id name")
        .select("-photo")
        .exec((err, products)=>{
            if(err){
                return res.status(400).json({
                    error: "products not found"
                });
            }
            return res.status(200).json(products)
        })
    }
    
};*/