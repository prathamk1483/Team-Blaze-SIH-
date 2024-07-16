const mongoose = require("mongoose")
const {Schema}=mongoose

const User_Doubt_Asker_Schema = new Schema({
    name: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required:true
    }, 
    doubtsAsked: [{
        type: mongoose.Types.ObjectId,
        ref: 'Doubt_Schema',
    }]
})

const User_Doubt_Asker = mongoose.model('doubt_asker', User_Doubt_Asker_Schema)
module.exports = User_Doubt_Asker