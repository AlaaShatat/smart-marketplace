const Governorate = require('../models/governorate');
const { errorHandler} = require('../helpers/dbErrorHandler');

exports.create = async(req,res) =>{
    const governorate = new Governorate(req.body);
    const cat =await Governorate.findOne( {name : req.body.name} )
    if (cat) {
        return res.status(400).json({
            error: "Duplicate name"
        })
    }
    governorate.save((err,data) =>{ 
        if(err)
        {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.status(200).json({data});
        })
};
exports.governorateById = (req, res, next, id) =>{
    Governorate.findById(id).exec((err, governorate)=>{
        if (err || !governorate){
            return res.status(200).json({
                error: "governorate does not exist"
            })
        }
        req.governorate = governorate;
        next();
    });

}
//read 
exports.read =  (req, res)=>{
    return res.status(200).json(req.governorate);
};
// update
exports.update =  (req, res)=>{
    const governorate = req.governorate;
    governorate.name = req.body.name;
    governorate.save((err, data)=>{
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
    const governorate = req.governorate;
    governorate.name = req.body.name;
    governorate.remove((err, data)=>{
        if (err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "governorate deleted successfully"
        })
    })
};
exports.list = (req, res)=>{
    Governorate.find().exec((err, data)=>{
        if (err){
             res.status(400).json({
                 error: errorHandler(err)
             })
        }
        res.status(200).json(data);
    })
};