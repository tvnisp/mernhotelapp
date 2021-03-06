const mongoose = require("mongoose");

const incidentSchema = mongoose.Schema(
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
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    location: {
      type: String,
      required: [true, "Please add a location"],
    },
    assignedTo: {
      name: String,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      lastname: String,
    },
    approximateResTime: Number,
    status: {
      type: String,
      required: true,
      default: "new",
    },
    resolvedAt: Date,
    responsibleDepartment: {
      type: String,
      required: [true, "Please add responsible department"],
    },
    priorityLevel: {
      type: String,
      required: [true, "Please add a priority"],
      enum: ["Critical", "High", "Medium", "Low"],
    },
    productImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Incident", incidentSchema);
