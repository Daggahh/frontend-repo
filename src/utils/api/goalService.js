import axios from "axios";
import { BASE_API_URL } from "../constant";

const API_URL = `${BASE_API_URL}/api/goals`;

export const createGoal = async (goalData) => {
  const token = localStorage.getItem("authtoken");
  const response = await axios.post(`${API_URL}/add`, goalData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getGoals = async () => {
  const token = localStorage.getItem("authtoken");
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateGoal = async (goalId, goalData) => {
  const token = localStorage.getItem("authtoken");
  const response = await axios.put(`${API_URL}/${goalId}`, goalData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
