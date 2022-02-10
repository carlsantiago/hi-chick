const { Schema, model } = require("mongoose");

const breedSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Breed = model("Breed", breedSchema);

module.exports = Breed;
