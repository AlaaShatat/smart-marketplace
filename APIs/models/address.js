const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 255
    },
    governorate:{
        type: ObjectId,
        ref: 'Governorate',
        required: true
    }

},
{timestamps:true}
)
module.exports = mongoose.model("Address", addressSchema);