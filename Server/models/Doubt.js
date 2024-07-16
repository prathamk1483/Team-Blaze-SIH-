const mongoose = require("mongoose")
const { Schema } = mongoose

const DoubtSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref:'User_Doubt_Asker'
    },
    title: {
        type: String,
        required:true
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    
})


const doubt = mongoose.model('doubt_schema', DoubtSchema)
module.exports=doubt
