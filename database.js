let mongoose = require("mongoose")

exports.connnectMongoose = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/passporttutorialDB")
        .then((e) => { console.log(`Connected to mongoDB:${e.connection.host}`) })
        .catch((e) => console.log(e))
}

let userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String
})

exports.User = mongoose.model("User",userSchema)