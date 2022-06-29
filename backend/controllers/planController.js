const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Plan = require("../models/planModel");

// @desc    Get uplans
// @route   GET /api/plans
// @access  Private
const getPlans = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Return only incidents with status = new or open
  // const query = Incident.find({ status: ["new", "open"] });
  const query = Plan.find({});
  const plans = await query.exec();
  // const incidents = await Incident.find({});
  if (!plans) {
    res.status(401);
    throw new Error("No plans found");
  }

  res.status(200).json(plans);
});

// @desc    Create a new plan
// @route   POST /api/plans
// @access  Private
const createPlan = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Parse data from dom
  const { outlet } = req.body;

  //Validation
  if (!outlet) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  //Create plan
  const plan = await Plan.create({
    user,
    username: user.name,
    outlet: outlet,
    planImage: req.file ? req.file.path : "",
  });

  if (plan) {
    res.status(201).json({
      _id: plan._id,
      user: plan.user.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid plan data");
  }
});

// @desc    Delete an plan
// @route   DELETE /api/plans:id
// @access  Private
const deletePlan = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const plan = await Plan.findById(req.params.id);
  if (!plan) {
    res.status(401);
    throw new Error("Plan not found");
  }

  if (plan.user.toString() != req.user.id && req.user.rights < 2) {
    res.status(401);
    throw new Error("Not authorised");
  }

  await plan.remove();

  // All incidents
  // const incidents = await Incident.find({});

  res.status(200).json({ id: plan._id });
});

module.exports = {
  createPlan,
  deletePlan,
  getPlans,
};
