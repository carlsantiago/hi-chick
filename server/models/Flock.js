const { Schema, model } = require("mongoose");

const flockSchema = new Schema({
  startDate: {
    type: Date,
    default: Date.now,
  },
  initialStock: {
    type: Number,
    required: true,
  },
  currentStock: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  femaleCount: {
    type: Number,
    required: true,
  },
  maleCount: {
    type: Number,
    required: true,
  },
  vaccinated: {
    type: Boolean,
    default: false,
  },
  shed: {
    type: Schema.Types.ObjectId,
    ref: "Shed",
    required: true,
  },
  breed: {
    type: Schema.Types.ObjectId,
    ref: "Breed",
    required: true,
  },
  status: {
    type: String,
    default: "Active",
  },
});

const Flock = model("Flock", flockSchema);

module.exports = Flock;
