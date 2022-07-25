import axios from "axios";

const API_URL = "/api/plans/";

//Create an plan
const createPlan = async (planData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, planData, config);
  return response.data;
};

//Get all plans
const getPlans = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

//Delete plan
const deletePlan = async (planID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + planID, config);
  return response.data;
};

const planService = {
  getPlans,
  createPlan,
  deletePlan,
};

export default planService;
