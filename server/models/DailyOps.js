const { Schema, model } = require("mongoose");

const DailyOpsSchema = new Schema({
  mortality: {
    type: Number,
    required: true,
  },

  eggsCollected: {
    type: Number,
    required: true,
  },

  feed: {
    type: String,
  },

  water: {
    type: String,
  },
  remarks: {
    type: String,
  },
});

const Daily = model("Daily", DailyOpsSchema);

module.exports = Daily;
