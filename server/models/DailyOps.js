const { Schema, model } = require("mongoose");

const DailyOpsSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },

  flockId: {
    type: Schema.Types.ObjectId,
    ref: "Flock",
    required: true,
  },

  femaleMorts: {
    type: Number,
    required: true,
  },
  maleMorts: {
    type: Number,
    required: true,
  },
  eggsCollected: {
    type: Number,
    required: true,
  },
});

const DailyOps = model("DailyOps", DailyOpsSchema);

module.exports = DailyOps;
