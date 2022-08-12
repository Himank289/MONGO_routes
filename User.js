const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    // mobileNo: { type: String, unique: true },
    username: { type: String, required: true, unique: true },
    email: {type: String, unique: true,required:true},
    password: {type: String, require:true},
    isAdmin: { type: Boolean, default: false},
    // age: { type: String, required: true },
    // address: { type: String, required: true },
    // dob: { type: String, required: true },
    // gender: { type: String, required: true },
},
    { timestamps: true }

);

module.exports = mongoose.model("User", UserSchema);