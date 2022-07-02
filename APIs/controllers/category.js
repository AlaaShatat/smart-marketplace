const Category = require('../models/category');
const { errorHandler} = require('../helpers/dbErrorHandler');

exports.create = async(req,res) =>{
    const category = new Category(req.body);
    const cat =await Category.findOne( {name : req.body.name} )
    if (cat) {
        return res.status(400).json({
            error: "Duplicate name"
        })
    }
    category.save((err,data) =>{ 
        if(err)
        {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.status(200).json({data});
        })
};
exports.categoryById = (req, res, next, id) =>{
    Category.findById(id).exec((err, category)=>{
        if (err || !category){
            return res.status(200).json({
                error: "category does not exist"
            })
        }
        req.category = category;
        next();
    });

}
//read 
exports.read =  (req, res)=>{
    return res.status(200).json(req.category);
};
// update
exports.update =  (req, res)=>{
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data)=>{
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
    const category = req.category;
    category.name = req.body.name;
    category.remove((err, data)=>{
        if (err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "category deleted successfully"
        })
    })
};
exports.list = (req, res)=>{
    Category.find().exec((err, data)=>{
        if (err){
             res.status(400).json({
                 error: errorHandler(err)
             })
        }
        res.status(200).json(data);
    })
};