const mongoose = require("mongoose");
const storeSchema = new mongoose.Schema({
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
    
    address:{
        type: Array,
        default: []
    },
    location:{
        type: Array,
        default:[]
    }
},
{timestamps:true}
)
module.exports = mongoose.model("Store", storeSchema);