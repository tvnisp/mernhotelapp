import axios from "axios";

const API_URL = "/api/incidents/";

//Create an incident
const createIncident = async (incidentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, incidentData, config);
  return response.data;
};

//Get all incidents
const getIncidents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

//Get incident
const getIncident = async (incidentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + incidentId, config);
  return response.data;
};

//Close incident
const closeIncident = async (incidentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + incidentId,
    { status: "closed", resolvedAt: Date.now() },
    config
  );
  return response.data;
};

//Assign incident
const assignIncident = async (incidentId, user, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + incidentId,
    {
      assignedTo: {
        name: user.name,
        email: user.email,
        lastname: user.lastName,
      },
      status: "open",
    },
    config
  );
  return response.data;
};

//Delete incident
const deleteIncident = async (incidentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + incidentId, config);
  return response.data;
};

const incidentService = {
  createIncident,
  getIncidents,
  getIncident,
  deleteIncident,
  closeIncident,
  assignIncident,
};

export default incidentService;
