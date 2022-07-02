const { errorHandler} = require('../helpers/dbErrorHandler');
const Store = require("../models/store")

exports.setData = (req,res) =>{
    const  store = new Store (req.body);
    store.save((err,data) =>{ 
        if(err)
        {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.status(200).json({data});
        })
};
exports.getData = (req,res) =>{
    store.find((err,data) =>{ 
        if(err)
        {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.status(200).json({data});
        })
};

exports.updateStore =(req, res) => {
    User.find({$set: req.body}, {new: true}, (err, store) =>{
        if (err){
            return res.status(400).json({
                error :" error not allowed"
            })
        }
        res.status(200).json(store)
    })

}