const mongoose = require("mongoose");

const TreatmentSchema = new mongoose.Schema({

    name: { type: String, required: true , unique : true},
    fees: { type: Number, required: true },
    specialization: { type: String, required: true },
},
    { timestamps: true }

);

module.exports = mongoose.model("Treatment", TreatmentSchema);