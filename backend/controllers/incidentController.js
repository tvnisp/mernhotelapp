const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Incident = require("../models/incidentModel");

// @desc    Get unresolved incidents
// @route   GET /api/incidents
// @access  Private
const getIncidents = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Return only incidents with status = new or open
  // const query = Incident.find({ status: ["new", "open"] });
  const query = Incident.find({});
  const incidents = await query.exec();
  // const incidents = await Incident.find({});
  if (!incidents) {
    res.status(401);
    throw new Error("No incidents found");
  }

  res.status(200).json(incidents);
});

// @desc    Create a new incident
// @route   POST /api/incidents
// @access  Private
const createIncident = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Parse data from dom
  const { description, location, responsibleDepartment, priorityLevel } =
    req.body;

  //Validation
  if (!description || !location || !responsibleDepartment || !priorityLevel) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  //Create Incident
  const incident = await Incident.create({
    user,
    username: user.name,
    description,
    location,
    responsibleDepartment,
    priorityLevel,
    productImage: req.file ? req.file.path : "",
  });

  if (incident) {
    res.status(201).json({
      _id: incident._id,
      user: incident.user.name,
      description: incident.description,
      status: incident.status,
    });
  } else {
    res.status(400);
    throw new Error("Invalid incident data");
  }
});

// @desc    Get a single incident
// @route   GET /api/incidents:id
// @access  Private
const getIncident = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const incident = await Incident.findById(req.params.id);
  if (!incident) {
    res.status(401);
    throw new Error("Incident not found");
  }

  res.status(200).json(incident);
});

// @desc    Delete an incident
// @route   DELETE /api/incidents:id
// @access  Private
const deleteIncident = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const incident = await Incident.findById(req.params.id);
  if (!incident) {
    res.status(401);
    throw new Error("Incident not found");
  }
  // console.log(incident.user.toString());
  // console.log(req.user.id);
  console.log(req.user.rights);
  if (incident.user.toString() != req.user.id && req.user.rights < 2) {
    res.status(401);
    throw new Error("Not authorised");
  }

  await incident.remove();

  // All incidents
  // const incidents = await Incident.find({});

  res.status(200).json({ id: incident._id });
});

// @desc    Update an incident
// @route   PUT /api/incidents:id
// @access  Private
const updateIncident = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const incident = await Incident.findById(req.params.id);
  if (!incident) {
    res.status(401);
    throw new Error("Incident not found");
  }

  // if (incident.user.toString() != req.user.id) {
  //   res.status(401);
  //   throw new Error("Not authorised");
  // }

  const updatedIncident = await Incident.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedIncident);
});

module.exports = {
  createIncident,
  getIncidents,
  getIncident,
  deleteIncident,
  updateIncident,
};
