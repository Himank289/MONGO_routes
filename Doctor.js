const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({

    name: { type: String, required: true },
    license: { type: String, required: true, unique: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: String, required: true },
    specialization : { type: String, required: true},
    charges : { type : Number },
    availbility : { type: Array }
},
    { timestamps: true }

);

module.exports = mongoose.model("User", DoctorSchema);