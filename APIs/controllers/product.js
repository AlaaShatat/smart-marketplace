const Product = require("../models/product");
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs'); 
const { errorHandler }  = require ('../helpers/dbErrorHandler');
const product = require("../models/product");

exports.create = (req, res) =>{
    let form = new formidable.IncomingForm();
    console.log(form.fields);
    form.keepExtensions = true;
    form.parse(req,(err, fields, files) =>{
        if(err){
            return res.status(400).json({
                error: 'image could not be found'
            });
        }
        const {name, description, price, owner, category, quantity, shipping} = fields;
        // check 
        if(!name|| !description || !price|| !category|| !quantity || !shipping){
            res.status(400).json({
                error: "missing requirements"
            })
        }
        let product = new Product(fields);
        console.log(product);
        
        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
              return res.status(400).json({
                error: "Image should be less than 1mb in size",
              });
            }
            product.photo.data = fs.readFileSync(files.photo.filepath); // change path to filepath
            product.photo.contentType = files.photo.mimetype; // change typt to mimetype
        }
        product.save((err, result)=>{
            if(err){
                return res.status(400).json({
                    error: err
                })
            }
            return res.status(200).json(result)
        })
    })
}
// get product by id
exports.productById = (req, res, next, id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err, product)=>{
        if(err || !product){
            return res.status(400).json({
                error: "product not found!"
            })
        }
        req.product = product;
        next();
    })
}
// get one product
exports.read = (req, res)=>{
    req.product.photo = undefined;
    return res.status(200).json(req.product);

}
// get all products
exports.list = (req, res)=>{
    let order = req.query.order ? req.query.order  : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy  : '_id'
    let limit = req.query.limit ? req.query.limit  : 6
    
    Product.find()
        .select("-photo")
        .populate("category")
        .populate("owner")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products)=>{
        if(err || !product){
            return res.status(400).json({
                error: "products not found!"
            })
        }
        return res.status(200).json(products);
})
}
// delete
exports.removebyseller = (req,res)=>{

    Product.deleteOne(req.product._id).exec((err)=>{
        if(err) 
            return res.status(400).json({
                error: "no product!"
            })
        return res.status(200).json({
            message: "deleted succesfully"})
    });
}
// update 
exports.updateProduct = (req, res) =>{
    let form = new formidable.IncomingForm();
    console.log(form.fields);
    form.keepExtensions = true;
    form.parse(req,(err, fields, files) =>{
        if(err){
            return res.status(400).json({
                error: 'image could not be found'
            });
        }
        const {name, description, price, owner, category, quantity, shipping} = fields;
        // check 
        if(!name|| !description || !price|| !category|| !quantity || !shipping){
            res.status(400).json({
                error: "missing requirements"
            })
        }
        let product = req.product;
        product = _.extend(product, fields);
        console.log(product);
        
        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
              return res.status(400).json({
                error: "Image should be less than 1mb in size",
              });
            }
            product.photo.data = fs.readFileSync(files.photo.filepath); // change path to filepath
            product.photo.contentType = files.photo.mimetype; // change typt to mimetype
        }
        product.save((err, result)=>{
            if(err){
                return res.status(400).json({
                    error: err
                })
            }
        })
    })
};

/// admin
exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Product deleted successfully'
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }

        let product = req.product;
        product = _.extend(product, fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};
/*get products with the same category 
*/
exports.listRelated = (req, res)=>{
    let limit = req.query.limit? parseInt(req.query.limit) : 6;
    product.find({_id:{$ne: req.product}, category:req.product.category})
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
};
exports.listRecommended = (req, res)=>{
    let limit = req.query.limit? parseInt(req.query.limit) : 6;
    product.find({ category:req.category})
        .limit(limit)
        .populate("category","_id name")
        .select("-photo")
        .exec((err, products)=>{
            if(err){
                return res.status(200).json({
                    error: "products not found"
                });
            }
            return res.status(400).json(products)
        })
};
exports.listCategories = (req, res)=>{
    Product.distinct("category", {}, (err, categories) => {
        if(err){
            return res.status(200).json({
                error: "can not find categories"
            });
        }
        res.status(200).json(categories)
    })
}
/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
 
 
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};
exports.photo =(req, res, next) => {
    if(req.product.photo.data){
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
};
exports.listSearch = (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    // assign search value to query.name
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: 'i' };
        // assigne category value to query.category
        if (req.query.category && req.query.category != 'All') {
            query.category = req.query.category;
        }
        // find the product based on query object with 2 properties
        // search and category
        Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(products);
        }).select('-photo');
    }
};

exports.decreaseQuantity = (req, res, next) => {
    let bulkOps = req.body.order.products.map(item => {
        return {
            updateOne: {
                filter: { _id: item._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } }
            }
        };
    });

    Product.bulkWrite(bulkOps, {}, (error, products) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update product'
            });
        }
        next();
    });
};