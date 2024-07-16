const mongoose = require("mongoose")
// const mongoURI = "mongodb+srv://rushisb55:rushikesh00@users.nvyog12.mongodb.net/HackMatrix?retryWrites=true&w=majority"
const mongoURI="mongodb://localhost:27017/HackMatrix"

const connectionParams = {
    useNewUrlparser: true,
    useUnifiedTopology:true
}

const connectToMongo = () =>
{
    mongoose.connect(mongoURI).then(() => {
        console.info("Connected to DB");
    })
        .catch((e) => {
            console.log("Error:", e);
        });
}

module.exports = connectToMongo