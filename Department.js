const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({

    name: { type: String, required: true , unique : true},
    totalBeds: { type: Number, required: true },
    availableBeds: { type: Number, required: true },
},
    { timestamps: true }

);

module.exports = mongoose.model("Department", DepartmentSchema);