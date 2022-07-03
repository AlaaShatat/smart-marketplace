const Address = require('../models/address');
const { errorHandler} = require('../helpers/dbErrorHandler');

exports.create = async(req,res) =>{
    const address = new Address(req.body);
    address.save((err,data) =>{ 
        if(err)
        {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.status(200).json({data});
        })
};
exports.addressById = (req, res, next, id) =>{
    Address.findById(id).exec((err, address)=>{
        if (err || !address){
            return res.status(200).json({
                error: "address does not exist"
            })
        }
        req.address = address;
        next();
    });

}
//read 
exports.read =  (req, res)=>{
    return res.status(200).json(req.address);
};
// update
exports.update =  (req, res)=>{
    const address = req.address;
    address.name = req.body.name;
    address.save((err, data)=>{
        if (err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data)
    })
};
// remove 
exports.remove = (req, res)=>{
    const address = req.address;
    address.name = req.body.name;
    address.remove((err, data)=>{
        if (err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "address deleted successfully"
        })
    })
};
exports.list = (req, res)=>{
    Address.find().exec((err, data)=>{
        if (err){
             res.status(400).json({
                 error: errorHandler(err)
             })
        }
        res.status(200).json(data);
    })
};