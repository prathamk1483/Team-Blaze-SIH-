const mongoose = require("mongoose");
const { Schema } = mongoose;

const User_Doubt_Solver_Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    expertise: {
        type: String,
        default: ""
    },
    contact_no: {
        type: String,
        default: ""
    },
    whatsapp: {
        type: String,
        default: ""
    },
    linkedin: {
        type: String,
        default: ""
    },
    insta: {
        type: String,
        default: ""
    }
});

const User_Doubt_Solver = mongoose.model('doubt_solver', User_Doubt_Solver_Schema);
module.exports = User_Doubt_Solver;
