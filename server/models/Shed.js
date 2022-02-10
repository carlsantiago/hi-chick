const { Schema, model } = require("mongoose");

const shedSchema = new Schema({
  location: {
    type: String,
    required: true,
    unique: true,
  },
});

const Shed = model("Shed", shedSchema);

module.exports = Shed;
