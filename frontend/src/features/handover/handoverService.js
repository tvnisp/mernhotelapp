import axios from "axios";

const API_URL = "/api/handovers/";

//Create an incident
const createHandover = async (handoverData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, handoverData, config);
  return response.data;
};

//Get all handovers
const getHandovers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// //Get incident
// const getIncident = async (incidentId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.get(API_URL + incidentId, config);
//   return response.data;
// };

// //Close incident
// const closeIncident = async (incidentId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.put(
//     API_URL + incidentId,
//     { status: "closed", resolvedAt: Date.now() },
//     config
//   );
//   return response.data;
// };

// //Assign incident
// const assignIncident = async (incidentId, user, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.put(
//     API_URL + incidentId,
//     {
//       assignedTo: {
//         name: user.name,
//         user: user._id,
//         lastname: user.lastName,
//       },
//       status: "open",
//     },
//     config
//   );
//   return response.data;
// };

//Delete incident
const deleteHandover = async (handoverID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + handoverID, config);
  return response.data;
};

const handoverService = {
  createHandover,
  getHandovers,
  deleteHandover,
};

export default handoverService;
