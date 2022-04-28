const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    lastname: {
      type: String,
      required: [true, "Please add a lastname"],
    },
    email: {
      type: String,
      required: [true, "Please add an Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    position: {
      type: String,
      required: [true, "Please add a position"],
    },
    rights: {
      type: Number,
      default: 1,
      //Normal user = 1, Supervisor = 2, Manager = 3, Admin = 4
    },
    department: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
