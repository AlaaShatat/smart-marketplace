const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required:true,
        maxlength:32
    },
    description:{
        type: String,
        required: true,
        maxlength:200
    },
    price:{
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    owner:{
        type: ObjectId,
        ref: 'User',
        required: false
    },
    category:{
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sold:{
        type: Number,
        default: 0
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    shipping:{
        require: false,
        type: Boolean
    }

},
{timestamps:true}
)
module.exports = mongoose.model("Product", productSchema);