const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({

    hospitalname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    contact : { type : String, required: true },
    doctorslist : { type : Array, required: true },
    departmentslist : { type : Array, required: true },
    treatmentlist : { type : Array, required: true },
    policies : { type : Array, required: true },
},
    { timestamps: true }

);

module.exports = mongoose.model("Hospital", HospitalSchema);