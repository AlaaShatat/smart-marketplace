const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const addressSchema = new mongoose.Schema({
    governorate:{
        type: ObjectId,
        ref: 'Governorate',
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 255
    },
    
    location: {
        type: String,
        trim: true,
        required: true,
        maxlength: 255
    }

},
{timestamps:true}
)
module.exports = mongoose.model("Address", addressSchema);