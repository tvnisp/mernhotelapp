const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Handover = require("../models/handoverModel");

// @desc    Get handovers
// @route   GET /api/handovers
// @access  Private
const getHandovers = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Return only handovers with status = new or open
  // const query = handover.find({ status: ["new", "open"] });
  const query = Handover.find({});
  const handovers = await query.exec();

  if (!handovers) {
    res.status(401);
    throw new Error("No handovers found");
  }

  res.status(200).json(handovers);
});

// @desc    Create a new handover
// @route   POST /api/handovers
// @access  Private
const createHandover = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Parse data from dom
  const { handoverDescription, outlet, shift } = req.body;

  //Validation
  if (!handoverDescription || !outlet || !shift) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  //Create handover
  const handover = await Handover.create({
    user,
    username: user.name,
    handoverDescription,
    outlet,
    shift,
  });

  if (handover) {
    res.status(201).json({
      _id: handover._id,
      user: handover.user.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid handover data");
  }
});

// @desc    Delete a handover
// @route   DELETE /api/handovers:id
// @access  Private
const deleteHandover = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const handover = await Handover.findById(req.params.id);
  if (!handover) {
    res.status(401);
    throw new Error("Handover not found");
  }

  if (handover.user.toString() != req.user.id && req.user.rights < 2) {
    res.status(401);
    throw new Error("Not authorised");
  }

  await handover.remove();

  res.status(200).json({ id: handover._id });
});

module.exports = {
  createHandover,
  getHandovers,
  deleteHandover,
};
