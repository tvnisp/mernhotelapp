const mongoose = require("mongoose");

const handoverSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
    },
    handoverDescription: {
      type: String,
      required: [true, "Please add a handover"],
    },
    outlet: {
      type: String,
      required: [true, "Please add an outlet"],
    },
    shift: {
      type: String,
      required: [true, "Please add the shift"],
      enum: ["early", "late"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Handover", handoverSchema);
